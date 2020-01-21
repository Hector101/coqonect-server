import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';

import { PreSession } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const StartPreSession: ResolverType = async (_, { refCode }) => {
  try {

    const preSession = await PreSession.findOne({
      where: { refCode },
    });

    if (!preSession) {
      throw new Error('Pre Session not found');
    }

    await getConnection()
      .createQueryBuilder()
      .update(PreSession)
      .set({ status: 'started' })
      .where('refCode = :refCode', { refCode })
      .execute();

    return { message: 'Pre Session started successfully' };

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

export default StartPreSession;
