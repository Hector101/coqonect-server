import winstonEnvLogger from 'winston-env-logger';
import { In, getRepository, Brackets } from 'typeorm';

import { Account, Skill, MentorshipRequest } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const CreateMentorshipRequest: ResolverType = async (_,
  { skillId, otherSkillIds, requestType, description  },
  { req: { decoded: { id: accountId } } },
  ) => {
  try {
    const skill = await Skill.findOne({
      where: { id: skillId },
    });

    if (!skill) {
      throw new Error('skill not found');
    }

    const mentorshipRequest = await getRepository(MentorshipRequest)
      .createQueryBuilder('menteeRequest')
      .leftJoinAndSelect('menteeRequest.skill', 'skill')
      .leftJoinAndSelect('menteeRequest.account', 'account')
      .where('skill.id = :skillId', { skillId })
      .andWhere('account.id = :accountId', { accountId })
      .andWhere(new Brackets(qb => {
        qb.where('menteeRequest.status = :status', { status: 'started' })
          .orWhere('menteeRequest.status = :status', { status: 'unresolved' });
      }))
      .getOne();

    if (mentorshipRequest) {
      throw new Error('Similar request still open. Kindly resolve or close.');
    }

    const account = await Account.findOne({
      where: { id: accountId },
    });

    const otherSkillsQueryParam = (otherSkillIds && otherSkillIds.length) ? In(otherSkillIds) : otherSkillIds;

    const otherSkills = await Skill.find({
      where: { id: otherSkillsQueryParam },
    });

    const newMentorshipRequest = MentorshipRequest.create({
      account,
      skill,
      otherSkills,
      requestType,
      description,
    });
    await newMentorshipRequest.save();

    return { message: 'Mentorship request created successfully' };
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

export default CreateMentorshipRequest;
