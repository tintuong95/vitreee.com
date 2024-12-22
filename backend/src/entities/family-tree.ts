
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class FamilyTree {
  @PrimaryGeneratedColumn("uuid")
  id: string;


  @Column()
  accountId: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ default: 0 })
  members: number;

  @Column()
  imageUrlCover: string;

  @Column()
  description: string;

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