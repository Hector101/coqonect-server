import passport from 'passport';
import { Strategy as GoogleStrategy } from '@passport-next/passport-google-oauth2';
import winstonEnvLogger from 'winston-env-logger';
import generator from 'generate-password';
import ipinfo from 'ipinfo';
import { getConnection } from 'typeorm';
import cryptoRandomString from 'crypto-random-string';

// database models
import { Account, Profile } from '../../db';

// lib
import sendToEmail from '../../lib/sendMail';
import { createToken } from '../../lib/generateTokens';

passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
},
async (_accessToken, _refreshToken, {
  _json: {
    name,
    email,
    picture,
  } ,
  },   done) => {
  try {
    const password = generator.generate({
      length: 15,
      numbers: true,
    });

    const account = await Account.findOne({
      where: { email },
    });

    if (!account) {
      const publicId = cryptoRandomString({ length: 10, characters: '1234567890' });

      const newProfile = Profile.create({
        fullName: name,
        imageUrl: picture,
      });
      await newProfile.save();

      const newAccount = Account.create({
        email,
        password,
        verified: true,
        publicId,
        profile: newProfile,
      });
      await newAccount.save();

      if (process.env.NODE_ENV === 'production') {
        await sendToEmail(email)((process.env.SENDGRID_SOCIAL_SIGNUP_ID as string), {
          fullName: name,
          password,
        });
      }

      const token = createToken({
        id: newAccount.id,
        verified: newAccount.verified,
        blocked: newAccount.blocked,
      },
      `${process.env.JWT_KEY}`,
        '7d');

      return done(null, {
        type: 'verified',
        mesage: 'Login successful',
        payload: { token },
      });
    }

    if (account && account.blocked) {
      return done('Account blocked, kindly contact an Administrator to resolve');
    }

    const profile = await Profile.findOne({
      where: { accountId: account.id },
    });

    if (profile && (!profile.city || !profile.country)) {

      ipinfo(async (_err: any, data: any) => {
        await getConnection()
          .createQueryBuilder()
          .update(Profile)
          .set({
            imageUrl: picture,
            city: data ? data.city : '',
            country: data ? data.country : '',
          })
          .where('id = :id', { id: account.profile.id })
          .execute();
      });
    }

    const newToken = createToken({
      id: account.id,
      verified: account.verified,
      blocked: account.blocked,
    },
    `${process.env.JWT_KEY}`,
      '7d');

    if (account && !account.verified) {
      await getConnection()
        .createQueryBuilder()
        .update(Account)
        .set({verified: true })
        .where('id = :id', { id: account.id })
        .execute();
    }

    return done(null, {
      type: 'verified',
      mesage: 'Login successful',
      payload: { token: newToken },
    });
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });
    return done('An Error occurred');
  }
}));

export default passport;
