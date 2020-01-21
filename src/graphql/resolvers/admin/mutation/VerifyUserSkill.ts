import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';

import { UserSkill } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const VerifyUserSkill: ResolverType = async (_parent, { accountId, skillId }) => {
  try {
    const account = await UserSkill.findOne({
      where: { accountId, skillId },
    });

    if (!account) {
      throw new Error('user skill not found');
    }

    await getConnection()
      .createQueryBuilder()
      .update(UserSkill)
      .set({
        verified: true,
      })
      .where('accountId = :accountId AND skillId = :skillId', { accountId, skillId })
      .execute();

    return { message: 'user skill verified successfully' };
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

export default VerifyUserSkill;
