import {ApiProperty} from '@nestjs/swagger';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToOne,
	JoinColumn,
	OneToOne,
} from 'typeorm';
import {IsNotEmpty, IsUUID, IsNumber, Min, Max, IsEnum} from 'class-validator';
import {RELATION_MEMBER_TYPE} from 'src/types/relation.type';
import {Account} from './account';
import {RE_ACCOUNT, RE_RELATION} from 'src/contants';

@Entity()
export class Relation {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({
		description: 'ID của mối quan hệ (UUID)',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	id: string;

	@Column()
	@IsUUID('4', {message: 'ID tài khoản phải là UUID hợp lệ'})
	@IsNotEmpty({message: 'ID tài khoản không được để trống'})
	@ApiProperty({
		description: 'ID tài khoản liên kết với mối quan hệ',
		example: '123e4567-e89b-12d3-a456-426614174001',
	})
	accountId: string;

	@Column({
		type: 'enum',
		enum: RELATION_MEMBER_TYPE,
		default: RELATION_MEMBER_TYPE.parent,
	})
	@IsEnum(RELATION_MEMBER_TYPE, {message: 'Quan hệ không hợp lệ'})
	@ApiProperty({
		description: 'Quan hệ của người dùng',
		enum: RELATION_MEMBER_TYPE,
		example: RELATION_MEMBER_TYPE.parent,
	})
	type: RELATION_MEMBER_TYPE;

	@Column()
	@JoinColumn({name: 'member_first_id'})
	@IsUUID('4', {message: 'ID tài khoản phải là UUID hợp lệ'})
	@IsNotEmpty({message: 'ID tài khoản không được để trống'})
	@ApiProperty({
		description: 'ID tài khoản liên kết với thành viên',
		example: '123e4567-e89b-12d3-a456-426614174001',
	})
	member_first_id: string;

	@Column()
	@JoinColumn({name: 'member_second_id'})
	@IsUUID('4', {message: 'ID tài khoản phải là UUID hợp lệ'})
	@IsNotEmpty({message: 'ID tài khoản không được để trống'})
	@ApiProperty({
		description: 'ID tài khoản liên kết với thành viên',
		example: '123e4567-e89b-12d3-a456-426614174001',
	})
	member_second_id: string;

	@CreateDateColumn()
	@ApiProperty({
		description: 'Thời gian tạo mối quan hệ',
		example: '2024-12-25T12:00:00Z',
	})
	createdAt: Date;

	@UpdateDateColumn()
	@ApiProperty({
		description: 'Thời gian cập nhật mối quan hệ gần nhất',
		example: '2024-12-26T12:00:00Z',
	})
	updatedAt: Date;

	@DeleteDateColumn()
	@ApiProperty({
		description: 'Thời gian xóa mối quan hệ (nếu có)',
		example: null,
	})
	deletedAt: Date;

	/**
	 * RELATION
	 */
	@ManyToOne(() => Account, (Account) => Account[RE_RELATION])
	[RE_ACCOUNT]: Account;
}
