import winstonEnvLogger from 'winston-env-logger';

import { MentorshipRequest, PreSession } from '../../../../db';

// lib
import { DUPLICATE_CODE } from '../../../../lib/constants';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const CreatePreSession: ResolverType = async (_,
  { mentorshipRequestId }, { req: { decoded: { id: menteeId } } },
) => {
  try {

    const mentorshipRequest = await MentorshipRequest.findOne({
      where: { id: mentorshipRequestId },
    });

    if (!mentorshipRequest) {
      throw new Error('Mentorship request not found');
    }

    const refCode = `cqt-${Date.now()}`;

    const preSession = PreSession.create({
      menteeId,
      mentorshipRequestId,
      refCode,
    });
    await preSession.save();

    return preSession;
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });

    if (e && e.code === DUPLICATE_CODE) {
      throw new Error('Pre Session already created');
    }

    throw new Error('An Error occurred');
  }
};

export default CreatePreSession;
