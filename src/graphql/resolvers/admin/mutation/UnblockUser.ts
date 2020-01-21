import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';

import { Account } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const UnblockUser: ResolverType = async (_parent, { id }) => {
  try {
    const account = await Account.findOne({
      where: { id },
    });

    if (!account) {
      throw new Error('user not found');
    }

    await getConnection()
      .createQueryBuilder()
      .update(Account)
      .set({
        blocked: false,
      })
      .where('id = :id', { id })
      .execute();

    return { message: 'Account unblocked successfully' };
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });

    if (e && e.message) {
      throw new Error(e.message);
    }
    throw new Error('An Error occurred');
  }
};

export default UnblockUser;
