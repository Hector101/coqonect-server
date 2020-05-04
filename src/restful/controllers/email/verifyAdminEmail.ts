import { Response, Request } from 'express';
import { getConnection } from 'typeorm';

import winstonEnvLogger from 'winston-env-logger';

import { Admin } from '../../../db';

// libs
import { respondWithSuccess, respondWithWarning } from '../../../lib/httpResponse';
import verifyToken from '../../../lib/verifyToken';
import sendToEmail from '../../../lib/sendMail';

const verifyAdminEmail = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const { id } = verifyToken(token);
    const admin = await Admin.findOne({ where: { id } });

    if (!admin) {
      return respondWithWarning(res, 404, 'Email verification failed');
    }

    if (admin.verified) {
      return respondWithWarning(res, 202, 'Email already verified');
    }

    await getConnection()
      .createQueryBuilder()
      .update(Admin)
      .set({verified: true })
      .where('id = :id', { id: admin.id })
      .execute();

    const { fullName, email } = admin;

    await sendToEmail(`"${fullName}" <${email}>`)
      ((process.env.SENDGRID_VERIFIED_TEMPLATE_ID as string), {
        fullName,
        loginPage: `${process.env.CLIENT_BASE_URL}/auth/login`,
      });

    return respondWithSuccess(res, 200, 'Email Verification Completed Successfully, Proceed to Login');
  } catch (error) {
    winstonEnvLogger.error({
      message: 'Error occurred verifying email',
      error,
    });
    return respondWithWarning(res, 500, 'Account verification fail');
  }
};

export default verifyAdminEmail;
