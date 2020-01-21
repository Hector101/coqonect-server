import _map from 'lodash/map';
import winstonEnvLogger from 'winston-env-logger';

import { Skill, SkillCategory } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

// lib
import { DUPLICATE_CODE } from '../../../../lib/constants';

const AddSkill: ResolverType = async (_parent, { name, categoryId }) => {
  try {
    const category = await SkillCategory.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error('skill category not found');
    }

    const skill = Skill.create({
      name,
      category,
    });
    await skill.save();

    return { message: 'skill added successfully' };
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });

    if (e && e.code === DUPLICATE_CODE) {
      throw new Error('skill already exist');
    }

    if (e && e.message) {
      throw new Error(e.message);
    }

    throw new Error('An Error occurred');
  }
};

export default AddSkill;
