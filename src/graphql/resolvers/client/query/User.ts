import winstonEnvLogger from 'winston-env-logger';

import { Account } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const User: ResolverType = async (_, { accountId }) => {
  try {
    const account = await Account.findOne({
      where: { id: accountId },
      relations: ['profile'],
    });

    if (!account) {
      throw new Error('user not found');
    }

    return account;
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

export default User;
