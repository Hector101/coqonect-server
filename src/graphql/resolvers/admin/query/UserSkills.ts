import winstonEnvLogger from 'winston-env-logger';
import { getRepository } from 'typeorm';
import _omit from 'lodash/omit';

import { UserSkill } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const UserSkills: ResolverType = async (_parent, { status, take, skip }) => {
  try {
    const userSkills = await getRepository(UserSkill)
      .createQueryBuilder('userSkills')
      .leftJoinAndSelect('userSkills.skill', 'skill')
      .leftJoinAndSelect('userSkills.account', 'account')
      .where('userSkills.status = :status', { status: status || 'pending' })
      .take(take)
      .skip(skip)
      .getMany();

      const skills = userSkills.map(userSkill => {
        return {
          ...userSkill.skill,
          ...(_omit(userSkill, 'skill')),
          accountId: userSkill.accountId,
        };
      });

    return skills;
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });
    throw new Error('An Error occurred');
  }
};

export default UserSkills;
