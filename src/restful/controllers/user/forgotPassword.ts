import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

// database models
import { Account } from '../../../db';

// libs
import { respondWithSuccess, respondWithWarning } from '../../../lib/httpResponse';
import sendToEmail from '../../../lib/sendMail';
import { createToken } from '../../../lib/generateTokens';

async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const account = await Account.findOne({
      where: { email },
      relations: ['profile'],
    });

    if (!account) {
      return respondWithWarning(res, 403, 'Password reset not permitted');
    }

    const { id, profile: { fullName } } = account;

    // if (process.env.NODE_ENV === 'production') {
      const token: string = createToken({ id }, (process.env.JWT_PASSWORD_RESET_KEY as string), '1h');

      await sendToEmail(`"${fullName}" <${email}>`)((process.env.SENDGRID_RESET_PASSWORD_TEMPLATE_ID as string), {
        fullName,
        verificationLink: `${process.env.CLIENT_BASE_URL}/reset-password?t=${token}`,
      });
    // }

    return respondWithSuccess(res, 200, 'Check your email to continue');
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An Error Occurred',
      error,
    });

    return respondWithWarning(res, 500, 'An Error Occurred');
  }
}

export default forgotPassword;
