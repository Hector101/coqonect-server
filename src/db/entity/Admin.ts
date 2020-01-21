import uuid from 'uuid/v4';
import {
  Entity,
  Column,
  Index,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
 } from 'typeorm';

 import { hashtPassword } from '../../lib/passwordOps';

@Entity('Admin')
export default class Admin extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Index()
  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('varchar', { length: 255 })
  fullName: string;

  @Column({ type: 'varchar', default: 'admin' })
  role: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  blocked: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date;

  @Column('timestamp', { precision: 3, default: () => 'CURRENT_TIMESTAMP(3)', onUpdate: 'CURRENT_TIMESTAMP(3)'})
  updatedAt: Date;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    this.password = hashtPassword(this.password);
  }
}
