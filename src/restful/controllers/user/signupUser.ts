import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';
import cryptoRandomString from 'crypto-random-string';

// database models
import { Account, Profile } from '../../../db';

// libs
import { respondWithSuccess, respondWithWarning } from '../../../lib/httpResponse';
import sendToEmail from '../../../lib/sendMail';
import { createToken } from '../../../lib/generateTokens';
import { DUPLICATE_CODE } from '../../../lib/constants';

async function Signup(req: Request, res: Response) {
  const { email, password, fullName } = req.body;
  const publicId = cryptoRandomString({ length: 10, characters: '1234567890' });

  try {
    const newProfile = Profile.create({
      fullName,
    });
    await newProfile.save();

    const newAccount = Account.create({
      email,
      password,
      publicId,
      profile: newProfile,
    });
    await newAccount.save();

    if (process.env.NODE_ENV === 'production') {
      const token: string = createToken({ id: newAccount.id }, (process.env.VERIFICATION_JWT_KEY as string), '1h');

      await sendToEmail(`"${fullName}" <${email}>`)((process.env.SENDGRID_SIGNIP_TEMPLATE_ID as string), {
        fullName,
        verificationLink: `${process.env.CLIENT_BASE_URL}/email-verification?t=${token}`,
      });
    }

    return respondWithSuccess(res, 201, 'Check your email to verify account');
  } catch (error) {
    if (error && error.code === DUPLICATE_CODE) {
      return respondWithWarning(res, 409, 'Email already in use');
    }

    winstonEnvLogger.error({
      message: 'Registration not successful',
      error,
    });

    return respondWithWarning(res, 500, 'Registration not successful');
  }
}

export default Signup;
