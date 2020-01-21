import winstonEnvLogger from 'winston-env-logger';

import { UserSkill } from '../../../../db';

// lib
import { DUPLICATE_CODE } from '../../../../lib/constants';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const AddUserSkill: ResolverType = async (_parent, { skillId }, { req: { decoded: { id: accountId } } }) => {
  try {
    const userSkill = UserSkill.create({
      skillId,
      accountId,
    });
    await userSkill.save();

    return { message: 'skill added successfully' };
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });

    if (e && e.code === DUPLICATE_CODE) {
      throw new Error('skill already added');
    }
    throw new Error('An Error occurred');
  }
};

export default AddUserSkill;
