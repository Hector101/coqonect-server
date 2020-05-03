import winstonEnvLogger from 'winston-env-logger';
import { getRepository } from 'typeorm';
import _omit from 'lodash/omit';

import { UserSkill } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const UserSkills: ResolverType = async (_parent, { status, name, email, skillName, take, skip }) => {
  try {
    const userSkills = await getRepository(UserSkill)
      .createQueryBuilder('userSkills')
      .leftJoinAndSelect('userSkills.skill', 'skill')
      .leftJoinAndSelect('userSkills.account', 'account')
      .leftJoinAndSelect('account.profile', 'profile')
      .where(status ? 'userSkills.status = :status' : '1=1', { status })
      .andWhere(skillName ? 'skill.name iLike :skillName' : '1=1', { skillName: `%${skillName}%` })
      .andWhere(email ? 'account.email = :email' : '1=1', { email })
      .andWhere(name ? 'profile.fullName iLike :name' : '1=1', { name: `%${name}%` })
      .take(take)
      .skip(skip)
      .getMany();

      const skills = userSkills.map(userSkill => {
        return {
          ...userSkill.skill,
          ...(_omit(userSkill, 'skill')),
          profile: userSkill.account.profile,
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
