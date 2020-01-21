import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';

import { UserSkill } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const AddUserSkill: ResolverType = async (_parent, { skillId }, { req: { decoded: { id: accountId } } }) => {
  try {
    const deletedUserSkill = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(UserSkill)
      .where('skillId = :skillId AND accountId = :accountId AND verified = :verified',
        {
          skillId,
          accountId,
          verified: false,
        })
      .execute();

    if (deletedUserSkill.affected === 0) {
      throw new Error('Error occurred removing skill');
    }
    return { message: 'skill removed successfully' };
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

export default AddUserSkill;
