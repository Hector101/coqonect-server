import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';

// database models
import { Account } from '../../../db';

// libs
import { respondWithSuccess, respondWithWarning } from '../../../lib/httpResponse';
import { verifyResetPassword } from '../../../lib/verifyToken';
import { hashPassword } from '../../../lib/passwordOps';

async function resetPassword(req: Request, res: Response) {
  const { token, password } = req.body;

  try {
    const { id } = verifyResetPassword(token);

    const account = await Account.findOne({
      where: { id },
    });

    if (!account) {
      return respondWithWarning(res, 403, 'Password reset unauthorized');
    }

    await getConnection()
      .createQueryBuilder()
      .update(Account)
      .set({
        password: hashPassword(password),
      })
      .where('id = :id', { id })
      .execute();

    return respondWithSuccess(res, 201, 'Password reset successful');
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An Error Occurred',
      error,
    });

    return respondWithWarning(res, 500, 'Password reset unauthorized');
  }
}

export default resetPassword;
