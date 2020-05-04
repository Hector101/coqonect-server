import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';
import { getConnection, getRepository } from 'typeorm';

// database models
import { Account } from '../../../db';

// libs
import { respondWithSuccess, respondWithWarning } from '../../../lib/httpResponse';
import sendToEmail from '../../../lib/sendMail';
import { verifyEmailToken } from '../../../lib/verifyToken';

const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const { id } = verifyEmailToken(token);

    const AccountRepository = getRepository(Account);
    const account = await AccountRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!account) {
      return respondWithWarning(res, 404, 'Email verification failed');
    }

    if (account.verified) {
      return respondWithWarning(res, 202, 'Email already verified');
    }

    await getConnection()
      .createQueryBuilder()
      .update(Account)
      .set({verified: true })
      .where('id = :id', { id: account.id })
      .execute();

      if (!account.profile) {
        return respondWithWarning(res, 404, 'Profile does not exist');
      }

    const { profile: { fullName }, email } = account;
    await sendToEmail(`"${fullName}" <${email}>`)((process.env.SENDGRID_VERIFIED_TEMPLATE_ID as string), {
      fullName,
      loginPage: `${process.env.CLIENT_BASE_URL}/auth/login`,
    });

    return respondWithSuccess(res, 200, 'Email Verification Completed Successfully, Proceed to Login');
  } catch (error) {
    winstonEnvLogger.error({
      message: 'Error occurred verifying email',
      error,
    });
    return respondWithWarning(res, 500, 'Account verification failed');
  }
};

export default verifyEmail;
