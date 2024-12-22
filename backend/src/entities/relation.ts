
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Relation {
  @PrimaryGeneratedColumn("uuid")
  id: string;


  @Column()
  type: number;

  @Column()
  member_first_id: number;

  @Column()
  member_second_id: number;

  @Column({ default: 0 })
  status: number;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty()
  deletedAt: Date;
}