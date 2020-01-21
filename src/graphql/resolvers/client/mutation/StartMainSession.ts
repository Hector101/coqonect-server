import winstonEnvLogger from 'winston-env-logger';

import { MainSession, PreSession } from '../../../../db';

// lib
import { DUPLICATE_CODE } from '../../../../lib/constants';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const CreateMainSession: ResolverType = async (_,
  { refCode, mentorId },
) => {
  try {

    const preSession = await PreSession.findOne({
      where: { refCode },
    });

    if (!preSession) {
      throw new Error('Pre Session not found');
    }

    const {
      menteeId,
      mentorshipRequestId,
    } = preSession;

    const mainSession = MainSession.create({
      menteeId,
      mentorId,
      mentorshipRequestId,
      refCode,
    });
    await mainSession.save();

    return { message: 'Main session started successfully' };
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });

    if (e && e.code === DUPLICATE_CODE) {
      throw new Error('Main Session already started');
    }

    if (e && e.message) {
      throw new Error(e.message);
    }

    throw new Error('An Error occurred');
  }
};

export default CreateMainSession;
