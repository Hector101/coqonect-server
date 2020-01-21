import winstonEnvLogger from 'winston-env-logger';
import { getRepository, Brackets } from 'typeorm';

import { MentorshipRequest } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const MyMentorshipRequests: ResolverType = async (_parent,
  // TODO implement filter for status
  { take, skip, requestType },
  { req: { decoded: { id: accountId } },
}) => {
  try {
    const mentorshipRequests = await getRepository(MentorshipRequest)
      .createQueryBuilder('mentorshipRequest')
      .leftJoinAndSelect('mentorshipRequest.skill', 'skill')
      .leftJoinAndSelect('mentorshipRequest.mentors', 'mentors')
      .leftJoinAndSelect('mentors.profile', 'profile')
      .leftJoinAndSelect('mentorshipRequest.account', 'account')
      .leftJoinAndSelect('mentorshipRequest.otherSkills', 'otherSkills')
      .where('account.id = :accountId', { accountId })
      .andWhere(new Brackets(qb => {
        if (requestType) {
          return qb.where('mentorshipRequest.requestType = :requestType', { requestType });
        }
        return qb.where('mentorshipRequest.requestType IN (:...requestType)', {
            requestType: ['urgent', 'extensive'],
          },
        );
      }))
      .orderBy('mentorshipRequest.createdAt', 'ASC')
      .take(take)
      .skip(skip)
      .getMany();

    return mentorshipRequests;
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });
    throw new Error('An Error occurred');
  }
};

export default MyMentorshipRequests;
