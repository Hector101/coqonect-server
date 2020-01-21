import winstonEnvLogger from 'winston-env-logger';

import { SkillCategory } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const SkillCategories: ResolverType = async () => {
  try {
    const skillCategories = await SkillCategory.find({
      relations: ['skills'],
    });

    return skillCategories;
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });
    throw new Error('An Error occurred');
  }
};

export default SkillCategories;
