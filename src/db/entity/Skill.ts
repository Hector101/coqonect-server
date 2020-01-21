import uuid from 'uuid/v4';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import SkillCategory from './SkillCategory';
import UserSkill from './UserSkill';
import MenteeRequest from './MentorshipRequest';

@Entity('Skill')
export default class Skill extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  name: string;

  @OneToMany(_type => MenteeRequest, menteeRequest => menteeRequest.skill)
  menteeRequest: MenteeRequest;

  @ManyToOne(_type => SkillCategory, category => category.skills)
  category: SkillCategory;

  @OneToMany(_type => UserSkill, userSkill => userSkill.skill)
  public userSkills: UserSkill[];

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
