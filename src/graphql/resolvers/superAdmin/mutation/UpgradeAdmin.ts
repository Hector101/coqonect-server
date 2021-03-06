import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';

import { Admin } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const UpgradeAdmin: ResolverType = async (_parent, { id }) => {
  try {
    const admin = await Admin.findOne({
      where: { id },
    });

    if (!admin) {
      throw new Error('admin not found');
    }

    await getConnection()
      .createQueryBuilder()
      .update(Admin)
      .set({
        role: 'superAdmin',
      })
      .where('id = :id', { id })
      .execute();

    return { message: 'Admin upgraded successfully' };
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

export default UpgradeAdmin;
