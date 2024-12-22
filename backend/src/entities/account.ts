
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
@Entity()
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

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

  @BeforeInsert()
  hash() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  isTruePassword(password: string) {
    return bcrypt.compareSync(password, this.password); // true
  }
}