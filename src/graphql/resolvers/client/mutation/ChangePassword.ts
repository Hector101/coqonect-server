import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';

import { Account } from '../../../../db';

import { isValidPassword, hashPassword } from '../../../../lib/passwordOps';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const ChangePassword: ResolverType = async (_parent,
    { oldPassword, newPassword },
    { req: { decoded: { id: accountId } } }) => {
  try {
    const account = await Account.findOne({
      where: { id: accountId },
    });

    if (!account || (account && !isValidPassword(oldPassword, account.password))) {
      throw Error('Incorrect Password!');
    }

    await getConnection()
      .createQueryBuilder()
      .update(Account)
      .set({
        password: hashPassword(newPassword),
      })
      .where('id = :id', { id: account.id })
      .execute();

    return { message: 'password changed successfully' };
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });

    throw new Error(e);
  }
};

export default ChangePassword;
