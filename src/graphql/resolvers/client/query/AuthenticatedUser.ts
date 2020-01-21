import winstonEnvLogger from 'winston-env-logger';

import { Account } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const AuthenticatedUser: ResolverType = async (_parent, _args, { req }) => {
  const { id } = req.decoded;
  try {
    const account = await Account.findOne({
      where: { id },
      relations: ['profile'],
    });

    return account;
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });
    throw new Error('An Error occurred');
  }
};

export default AuthenticatedUser;
