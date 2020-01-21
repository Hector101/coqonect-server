import winstonEnvLogger from 'winston-env-logger';

import { SkillCategory } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

// lib
import { DUPLICATE_CODE } from '../../../../lib/constants';

const AddSkillCategory: ResolverType = async (_parent, { name }) => {
  try {
    const skillCategory = SkillCategory.create({
      name,
    });
    await skillCategory.save();

    return { message: 'skill category added successfully' };
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });

    if (e && e.code === DUPLICATE_CODE) {
      throw new Error('skill category already exist');
    }
    throw new Error('An Error occurred');
  }
};

export default AddSkillCategory;
