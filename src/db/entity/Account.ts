import uuid from 'uuid/v4';
import {
  Entity,
  Column,
  Index,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  OneToOne,
  OneToMany,
  JoinColumn,
 } from 'typeorm';

 import { hashPassword } from '../../lib/passwordOps';

 import Profile from './Profile';
 import UserSkill from './UserSkill';
import MentorshipRequest from './MentorshipRequest';
import PreSession from './PreSession';
import MainSession from './MainSession';
import Rating from './Rating';

@Entity('Account')
export default class Account extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Index()
  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('varchar', { length: 255 })
  publicId: string;

  @Column({ default: false })
  blocked: boolean;

  @Column({ default: false })
  verified: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date;

  @Column('timestamp', { precision: 3, default: () => 'CURRENT_TIMESTAMP(3)', onUpdate: 'CURRENT_TIMESTAMP(3)'})
  updatedAt: Date;

  @OneToOne(_type => Profile, profile => profile.account, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;

  @OneToOne(_type => Rating, rating => rating.account, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  rating: Rating;

  @OneToMany(_type => UserSkill, userSkill => userSkill.account, {
    onDelete: 'NO ACTION',
  })
  public userSkills: UserSkill[];

  @OneToMany(_type => MentorshipRequest, mentorshipRequest => mentorshipRequest.account, {
    onDelete: 'NO ACTION',
  })
  public mentorshipRequests: MentorshipRequest[];

  @OneToMany(_type => PreSession, preSession => preSession.mentee, {
    onDelete: 'NO ACTION',
  })
  public menteePreSessions: PreSession[];

  @OneToMany(_type => MainSession, mainSession => mainSession.mentee, {
    onDelete: 'NO ACTION',
  })
  public menteeMainSessions: MainSession[];

  @OneToMany(_type => MainSession, mainSession => mainSession.mentor, {
    onDelete: 'NO ACTION',
  })
  public mentorMainSessions: MainSession[];

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    this.password = hashPassword(this.password);
  }
}
