import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';

import { PreSessionNotification } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const ReadPreSessionNotification: ResolverType = async (
  _,
  { preSessionId },
  {req: { decoded: { id: receiverId }}}) => {
  try {

    const preSessionNotification = await PreSessionNotification.findOne({
      where: { preSessionId },
    });

    if (!preSessionNotification) {
      throw new Error('Notification not found');
    }

    const { affected } = await getConnection()
      .createQueryBuilder()
      .update(PreSessionNotification)
      .set({ read: true})
      .where('preSessionId = :preSessionId AND receiverId = :receiverId' , { preSessionId, receiverId })
      .execute();

      if (!affected) {
        throw new Error('You can\'t read notification');
      }

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

export default ReadPreSessionNotification;
