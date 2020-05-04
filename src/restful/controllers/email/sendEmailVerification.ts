import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

// dababse models
import { Account } from '../../../db';

// libs
import { respondWithSuccess, respondWithWarning } from '../../../lib/httpResponse';
import sendToEmail from '../../../lib/sendMail';
import { createToken } from '../../../lib/generateTokens';

const sendEmailVerification = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const account = await Account.findOne({
      where: { email },
      relations: ['profile'],
    });

    if (!account) {
      return respondWithWarning(res, 404, 'Account does not exist');
    }

    if (!account.profile) {
      return respondWithWarning(res, 404, 'Profile does not exist');
    }

    const { fullName } = account.profile;
    const token: string = createToken({ id: account.id }, (process.env.JWT_KEY as string), '1h');

    await sendToEmail(`"${fullName}" <${email}>`)((process.env.SENDGRID_SIGNIP_TEMPLATE_ID as string), {
      fullName,
      verificationLink: `${process.env.CLIENT_BASE_URL}/auth/email-verification?t=${token}`,
    });

    return respondWithSuccess(res, 200, 'Email Verification sent successfully');
  } catch (error) {
    winstonEnvLogger.error({
      message: 'Error occurred verifying email',
      error,
    });
    return respondWithWarning(res, 500, 'Error occurred verifying email');
  }
};

export default sendEmailVerification;
