import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';

import { MentorshipRequest, MentorToMenteeNotification } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

// lib
import { DUPLICATE_CODE, MENTOR_TO_MENTEE_NOTIFICATION } from '../../../../lib/constants';

const NotifyMentorshipRequest: ResolverType = async (_,
  { mentorshipRequestId }, { req: { decoded: { id: mentorId } }, pubSub,
}) => {
  try {
    const mentorshipRequest = await getConnection()
      .createQueryBuilder(MentorshipRequest, 'mentorshipRequest')
      .leftJoinAndSelect('mentorshipRequest.account', 'account')
      .where('mentorshipRequest.id = :mentorshipRequestId', { mentorshipRequestId })
      .getOne();

      if (!mentorshipRequest) {
        throw new Error('Mentorship request not found');
      }

    await getConnection()
      .createQueryBuilder()
      .relation(MentorshipRequest, 'mentors')
      .of(mentorshipRequestId)
      .add(mentorId);

      const mentorToMenteeNotification = MentorToMenteeNotification.create({
        mentorshipRequestId,
        senderId: mentorId,
        receiverId: mentorshipRequest.account.id,
      });
      await mentorToMenteeNotification.save();

    pubSub.publish(MENTOR_TO_MENTEE_NOTIFICATION, {
      mentorshipRequestId: mentorshipRequest.id,
      mentorToMenteeNotification,
    });

    return { message: 'Mentee notified successfully' };
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });

    if (e && e.code === DUPLICATE_CODE) {
      throw new Error('You already notified mentee');
    }

    if (e && e.message) {
      throw new Error(e.message);
    }

    throw new Error('An Error occurred');
  }
};

export default NotifyMentorshipRequest;
