import { Request } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import winstonEnvLogger from 'winston-env-logger';
import ipinfo from 'ipinfo';
import { getConnection } from 'typeorm';

// database models
import { Account, Profile } from '../../db';

// libs
import { isValidPassword } from '../../lib/passwordOps';
import { createToken } from '../../lib/generateTokens';

passport.use('login', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
  (async (_req: Request, email, password, done) => {
    try {
      const account = await Account.findOne({
        where: { email },
        relations: ['profile'],
      });

      if (account && account.blocked) {
        return done('Account blocked, kindly contact an Administrator to resolve');
      }

      if (!account || (account && !isValidPassword(password, account.password))) {
        return done('Incorrect email or password.');
      }

      if (account && !account.verified) {
        return done('Account not verified');
      }

      const { profile } = account;

      if (profile && (!profile.city || !profile.country)) {
        ipinfo(async (_err: any, data: any) => {
          await getConnection()
            .createQueryBuilder()
            .update(Profile)
            .set({
              city: data ? data.city : '',
              country: data ? data.country : '',
            })
            .where('id = :id', { id: account.profile.id })
            .execute();
        });
      }

      const token = createToken({
        id: account.id,
        verified: account.verified,
        blocked: account.blocked,
        },
        `${process.env.JWT_KEY}`,
        '7d');

      return done(null, {
        type: 'verified',
        mesage: 'Login successful',
        payload: { token },
      });
    } catch (e) {
      winstonEnvLogger.error({
        message: 'An Error occurred',
        error: e,
      });
      return done('An Error occurred');
    }
  })));

export default passport;
