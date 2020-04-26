import winstonEnvLogger from 'winston-env-logger';
import _omit from 'lodash/omit';

import { UserSkill } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const UserSkills: ResolverType = async ({ id }) => {

  try {
    const userSkills = await UserSkill.find({
      where: { accountId: id },
      relations: ['skill'],
    });

    const skills = userSkills.map(userSkill => {
      return {
        ...userSkill.skill,
        ...(_omit(userSkill, 'skill')),
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
