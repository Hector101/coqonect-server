import uuid from 'uuid/v4';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  OneToMany,
 } from 'typeorm';

 import Skill from './Skill';

@Entity('SkillCategory')
export default class SkillCategory extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  name: string;

  @OneToMany(_type => Skill, skill => skill.category)
  skills: Skill[];

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
