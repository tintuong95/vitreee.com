
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn("uuid")
  id: string;


  @Column()
  accountId: number;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  avatar: string;

  @Column()
  description: string;

  @Column()
  birth_date: string;

  @Column()
  dead_date: string;

  @Column({ default: 0 })
  gender: number;

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