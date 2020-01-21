import winstonEnvLogger from 'winston-env-logger';
import { Brackets, getRepository } from 'typeorm';

import { PreSessionNotification } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const PreSessionNotifications: ResolverType = async (_parent,
  { status = 'all', take = 10, skip = 0 },
  { req: { decoded: { id: receiverId } },
}) => {
  try {
    const mentorshipNotifications = await getRepository(PreSessionNotification)
      .createQueryBuilder('preSessionNotification')
      .where('preSessionNotification.receiverId = :receiverId', { receiverId })
      .andWhere(new Brackets(qb => {
        if (status === 'read') {
          return qb.where('preSessionNotification.read = :status', { status: true });
        } else if (status === 'unread') {
          return qb.where('preSessionNotification.read = :status', { status: false });
        }
        return qb.where('preSessionNotification.read IN (:...status)', { status: [ true, false ] });
      }))
      .orderBy('preSessionNotification.createdAt', 'ASC')
      .take(take)
      .skip(skip)
      .getMany();

    return mentorshipNotifications;
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });
    throw new Error('An Error occurred');
  }
};

export default PreSessionNotifications;
