import uuid from 'uuid/v4';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  OneToOne,
 } from 'typeorm';

 import Account from './Account';

@Entity('Profile')
export default class Profile extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  fullName: string;

  @Column('varchar', { nullable: true })
  gender: string;

  @Column('varchar', { nullable: true })
  imageUrl: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column('varchar', { nullable: true })
  city: string;

  @Column('varchar', { nullable: true })
  country: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date;

  @Column('timestamp', { precision: 3, default: () => 'CURRENT_TIMESTAMP(3)', onUpdate: 'CURRENT_TIMESTAMP(3)'})
  updatedAt: Date;

  @OneToOne(_type => Account, account => account.profile)
  account: Account;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
