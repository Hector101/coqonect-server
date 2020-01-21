import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';

import { MainSession } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const CreateMainSession: ResolverType = async (_, { refCode }) => {
  try {

    const mainSession = await MainSession.findOne({
      where: { refCode },
    });

    if (!mainSession) {
      throw new Error('Main Session not found');
    }

    await getConnection()
      .createQueryBuilder()
      .update(MainSession)
      .set({ status: 'ended', endedAt: () => 'CURRENT_TIMESTAMP(3)' })
      .where('refCode = :refCode', { refCode })
      .execute();

    return { message: 'Main session end successfully' };
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

export default CreateMainSession;
