import { Response, Request } from 'express';
import winstonEnvLogger from 'winston-env-logger';
import cryptoRandomString from 'crypto-random-string';

// database models
import { Admin } from '../../../db';

// libs
import { respondWithSuccess, respondWithWarning } from '../../../lib/httpResponse';
import sendToEmail from '../../../lib/sendMail';
import { createToken } from '../../../lib/generateTokens';

const createAdmin = async (req: Request, res: Response) => {
  try {
    const { email, fullName } = req.body;
    const password: string = cryptoRandomString({ length: 10, characters: '1234567890' });

    const admin = Admin.create({
        email,
        password,
        role: 'admin',
        fullName,
      });
      await admin.save();

    if (!admin) {
      return respondWithWarning(res, 409, 'Email already in use');
    }

    const verificationToken: string = createToken({ id: admin.id }, process.env.JWT_KEY as string, '1h');

    if (process.env.NODE_ENV === 'production') {
      await sendToEmail(`<${email}>`)(process.env.ADMIN_SIGNUP_TEMPLATE as string, {
        fullName: admin.fullName,
        password,
        note: 'Link expires in one(1) hour time',
        verificationLink: `${process.env.ADMIN_CLIENT_BASE_URL}/admin/verify-email?token=${verificationToken}`,
      });
    }

    return respondWithSuccess(res, 201, 'Signup successful, Check your email to verify account');
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An Error Occurred',
      error,
    });
    return respondWithWarning(res, 500, 'An Error Occurred');
  }
};

export default createAdmin;
