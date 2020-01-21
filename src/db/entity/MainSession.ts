import uuid from 'uuid/v4';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

import Account from './Account';
import MentorshipRequest from './MentorshipRequest';

@Entity('MainSession')
export default class MainSession extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  menteeId: string;

  @Column('uuid')
  mentorId: string;

  @Column('uuid')
  mentorshipRequestId: string;

  @Column({ type: 'varchar', default: 'started' })
  status: string;

  @Column('varchar')
  refCode: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP(3)' })
  startedAt: Date;

  @Column('timestamp', { nullable: true })
  endedAt: Date;

  @ManyToOne(_type => Account, account => account.menteeMainSessions)
  mentee: Account;

  @ManyToOne(_type => Account, account => account.mentorMainSessions)
  mentor: Account;

  @ManyToOne(_type => MentorshipRequest, mentorshipRequest => mentorshipRequest.mainSessions)
  mentorshipRequest: MentorshipRequest;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
