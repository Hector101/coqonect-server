import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';

import { MainSession, Rating, Account } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const RateMentor: ResolverType = async (_parent,
  { mainSessionId, mentorId, rate },
  { req: { decoded: { id: menteeId } },
}) => {
  try {
    const mainSession = await MainSession.findOne({
      where: { id: mainSessionId, mentorId, menteeId, status: 'ended' },
    });

    if (!mainSession) {
      throw new Error('Rating failed, invalid mentorhip session');
    }

    const mentor = await Account.findOne({
      where: { id: mentorId },
      relations: ['rating'],
    });

    if (!mentor) {
      throw new Error('Rating failed, mentor not found');
    }

    if (mentor && mentor.rating && mentor.rating.id) {
      await getConnection()
        .createQueryBuilder()
        .update(Rating)
        .set({
          totalRatings: mentor.rating.totalRatings + rate,
          ratingCount: mentor.rating.ratingCount + 1,
        })
        .where('id = :id', { id: mentor.rating.id })
        .execute();

      return { message: 'Rating successful' };
    }

    const rating = Rating.create({
      totalRatings: rate,
      ratingCount: 1,
    });
    await rating.save();

    await getConnection()
        .createQueryBuilder()
        .update(Account)
        .set({
          rating,
        })
        .where('id = :id', { id: mentorId })
        .execute();

    return { message: 'Rating successful' };
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

export default RateMentor;
