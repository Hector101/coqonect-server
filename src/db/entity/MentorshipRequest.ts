import uuid from 'uuid/v4';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import Account from './Account';
import Skill from './Skill';
import PreSession from './PreSession';
import MainSession from './MainSession';

@Entity('MentorshipRequest')
export default class MentorshipRequest extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', default: 'urgent' })
  requestType: string;

  @Column({ type: 'varchar', default: 'created' })
  status: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date;

  @ManyToOne(_type => Account, account => account.mentorshipRequests)
  account: Account;

  @ManyToOne(_type => Skill, skill => skill.menteeRequest)
  skill: Skill;

  @ManyToMany(_type => Skill)
  @JoinTable()
  otherSkills: Skill[];

  @ManyToMany(_type => Account)
  @JoinTable()
  mentors: Account[];

  @OneToMany(_type => PreSession, preSession => preSession.mentorshipRequest)
  preSessions: PreSession[];

  @OneToMany(_type => MainSession, mainSession => mainSession.mentorshipRequest)
  mainSessions: MainSession[];

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
