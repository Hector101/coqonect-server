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

import Account from './Account';
import MentorshipRequest from './MentorshipRequest';

@Entity('PreSession')
@Unique(['menteeId', 'mentorshipRequestId'])
export default class PreSession extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  menteeId: string;

  @Column('uuid')
  mentorshipRequestId: string;

  @Column({ type: 'varchar', default: 'available' })
  status: string;

  @Column('varchar')
  refCode: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP(3)'})
  createdAt: Date;

  @ManyToOne(_type => Account, account => account.menteePreSessions)
  mentee: Account;

  @ManyToOne(_type => MentorshipRequest, mentorshipRequest => mentorshipRequest.preSessions)
  mentorshipRequest: MentorshipRequest;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
