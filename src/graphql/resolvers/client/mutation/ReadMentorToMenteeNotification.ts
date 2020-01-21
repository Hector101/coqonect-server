import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';

import { MentorToMenteeNotification } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const ReadMentorToMenteeNotification: ResolverType = async (_,
    { mentorshipRequestId },
    { req: { decoded: { id: receiverId } } },
  ) => {
  try {

    const mentorToMenteeNotification = await MentorToMenteeNotification.findOne({
      where: { mentorshipRequestId },
    });

    if (!mentorToMenteeNotification) {
      throw new Error('Notification not found');
    }

    await getConnection()
      .createQueryBuilder()
      .update(MentorToMenteeNotification)
      .set({ read: true})
      .where('mentorshipRequestId = :mentorshipRequestId AND receiverId = :receiverId', {
        mentorshipRequestId,
        receiverId,
      })
      .execute();

    return { message: 'Notification read successfully' };

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

export default ReadMentorToMenteeNotification;
