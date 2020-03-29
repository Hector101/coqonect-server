import winstonEnvLogger from 'winston-env-logger';

import { SkillCategory } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const SkillCategoryResolver: ResolverType = async (_, { id }) => {
  try {
    const skillCategory = await SkillCategory.findOne({
      where: { id },
      relations: ['skills'],
    });

    if (!skillCategory) {
      throw new Error('skill category not found');
    }

    return skillCategory;
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

export default SkillCategoryResolver;
