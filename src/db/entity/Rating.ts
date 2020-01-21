import uuid from 'uuid/v4';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  OneToOne,
  AfterLoad,
 } from 'typeorm';

 import Account from './Account';

@Entity('Rating')
export default class Rating extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('integer', { default: 0 })
  totalRatings: number;

  @Column('integer', { default: 0 })
  ratingCount: number;

  @Column('float', { nullable: true })
  average: number;

  @OneToOne(_type => Account, account => account.rating)
  account: Account;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }

  @AfterLoad()
  getAverage() {
    if (this.totalRatings > 0 && this.ratingCount > 0) {
      this.average = this.totalRatings / this.ratingCount;
    }
  }
}
