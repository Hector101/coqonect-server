import winstonEnvLogger from 'winston-env-logger';
import { getConnection, Brackets } from 'typeorm';

import { Account } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const FetchMentors: ResolverType = async (_parent,
  { name, city, country, skillId, take, skip },
) => {
  try {
    const mentors = await getConnection()
      .createQueryBuilder(Account, 'account')
      .leftJoinAndSelect('account.rating', 'rating')
      .leftJoinAndSelect('account.profile', 'profile')
      .leftJoinAndSelect('account.userSkills', 'userSkills')
      .where(new Brackets(qb => {
        if (name) {
          return qb.where('profile.fullName ilike :name', { name: `%${name}%` });
        }
        return true;
      }))
      .where(new Brackets(qb => {
        if (city) {
          return qb.where('profile.city = :city', { city });
        }
        if (country) {
          return qb.where('profile.country = :country', { country });
        }
        return true;
      }))
      .andWhere(new Brackets(qb => {
        if (skillId) {
          return qb.where('userSkills.skillId = :skillId', { skillId })
            .andWhere('userSkills.verified = :verified', { verified: true });
        }
        return qb.where('userSkills.verified = :verified', { verified: true });
      }))
      .take(take)
      .skip(skip)
      .orderBy('rating.average', 'ASC')
      .getMany();

    return mentors;
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });
    throw new Error('An Error occurred');
  }
};

export default FetchMentors;
