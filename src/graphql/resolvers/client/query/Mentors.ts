import winstonEnvLogger from 'winston-env-logger';
import { getRepository } from 'typeorm';

import { MentorshipRequest } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const Mentors: ResolverType = async ({ mentorshipRequestId }) => {
  try {
    const mentorshipRequest = await getRepository(MentorshipRequest)
      .createQueryBuilder('mentorshipRequest')
      .leftJoinAndSelect('mentorshipRequest.mentors', 'mentors')
      .leftJoinAndSelect('mentors.profile', 'profile')
      .where('mentorshipRequest.id = :mentorshipRequestId', { mentorshipRequestId })
      .getOne();

      if (!mentorshipRequest) {
        return [];
      }

    return mentorshipRequest.mentors;
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });
    throw new Error('An Error occurred');
  }
};

export default Mentors;
