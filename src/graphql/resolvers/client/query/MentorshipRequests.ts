import winstonEnvLogger from 'winston-env-logger';
import { getRepository, Brackets } from 'typeorm';

import { MentorshipRequest, UserSkill } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const MentorshipRequestsResolver: ResolverType = async (_,
  { requestType, status, take = 10, skip },
  { req: { decoded: { id: accountId } } },
) => {
  try {

    const userSkills = await UserSkill.find({
      where: { accountId },
      relations: ['skill'],
    });

    const skillIds = userSkills
      .filter(userSkill => userSkill.status === 'verified')
      .map(userSkill => userSkill.skillId);

    if (!skillIds.length) {
      return [];
    }

    const mentorshipRequests = await getRepository(MentorshipRequest)
      .createQueryBuilder('mentorshipRequest')
      .leftJoinAndSelect('mentorshipRequest.skill', 'skill')
      .leftJoinAndSelect('mentorshipRequest.account', 'account')
      .leftJoinAndSelect('account.profile', 'profile')
      .leftJoinAndSelect('mentorshipRequest.otherSkills', 'otherSkills')
      .leftJoinAndSelect('mentorshipRequest.mentors', 'mentors')
      .where('skill.id IN (:...skillIds)', { skillIds })
      .andWhere(new Brackets(qb => {
        if (status) {
          return qb.where('mentorshipRequest.status = :status', { status });
        }
        return qb.where('mentorshipRequest.status IN (:...status)', { status: ['created', 'unresolved'] });
      }))
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

export default MentorshipRequestsResolver;
