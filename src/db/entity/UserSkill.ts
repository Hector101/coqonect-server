import uuid from 'uuid/v4';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  ManyToOne,
  Unique,
 } from 'typeorm';

 import Skill from './Skill';
import Account from './Account';

@Entity('UserSkill')
@Unique(['skillId', 'accountId'])
export default class UserSkill extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  skillId: string;

  @Column('uuid')
  accountId: string;

  @Column({ default: false })
  verified: boolean;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  evidence: string;

  @Column({ type: 'int', nullable: true })
  years: number;

  @Column({ type: 'int', nullable: true })
  months: number;

  @ManyToOne(_type => Account, account => account.userSkills)
  account: Account;

  @ManyToOne(_type => Skill, skill => skill.userSkills)
  skill: Skill;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
