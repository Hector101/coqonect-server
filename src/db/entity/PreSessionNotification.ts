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

@Entity('PreSessionNotification')
@Unique(['senderId', 'receiverId', 'preSessionId'])
export default class PreSessionNotification extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  senderId: string;

  @Column('varchar')
  receiverId: string;

  @Column('varchar')
  preSessionId: string;

  @Column('boolean', { default: false })
  read: boolean;

  @ManyToOne(_type => Account)
  sender: Account;

  @ManyToOne(_type => Account)
  receiver: Account;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
