import {ApiProperty} from '@nestjs/swagger';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import {
	IsNotEmpty,
	IsString,
	MinLength,
	MaxLength,
	IsEnum,
	IsUUID,
} from 'class-validator';
import {FAMILY_TREE_STATUS} from 'src/types/family-tree.type';
import {Account} from './account';
import {RE_ACCOUNT, RE_FAMILY_TREE, RE_MEMBER, RE_RELATION} from 'src/contants';
import {Member} from './member';

@Entity()
export class FamilyTree {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({
		description: 'ID của cây phả hệ (UUID)',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	id: string;

	@Column()
	@IsNotEmpty({message: 'Tên cây phả hệ không được để trống'})
	@IsString({message: 'Tên cây phả hệ phải là chuỗi'})
	@MinLength(3, {message: 'Tên cây phả hệ phải có ít nhất 3 ký tự'})
	@MaxLength(50, {message: 'Tên cây phả hệ không được vượt quá 50 ký tự'})
	@ApiProperty({
		description: 'Tên của cây phả hệ',
		example: 'cây phả hệ Gia đình',
		minLength: 3,
		maxLength: 50,
	})
	name: string;

	@Column()
	@IsUUID('4', {message: 'ID tài khoản phải là UUID hợp lệ'})
	@IsNotEmpty({message: 'ID tài khoản không được để trống'})
	@ApiProperty({
		description: 'ID của tài khoản liên kết với cây phả hệ',
		example: '123e4567-e89b-12d3-a456-426614174001',
	})
	accountId: string;

	@Column()
	@IsString({message: 'Địa chỉ phải là chuỗi'})
	@IsNotEmpty({message: 'Địa chỉ không được để trống'})
	@MinLength(10, {message: 'Địa chỉ phải có ít nhất 10 ký tự'})
	@MaxLength(100, {message: 'Địa chỉ không được vượt quá 100 ký tự'})
	@ApiProperty({
		description: 'Địa chỉ của cây phả hệ',
		example: '123 Đường ABC, Thành phố XYZ',
		minLength: 10,
		maxLength: 100,
	})
	address: string;

	@Column()
	@IsString({message: 'Mô tả phải là chuỗi'})
	@IsNotEmpty({message: 'Mô tả không được để trống'})
	@MinLength(20, {message: 'Mô tả phải có ít nhất 20 ký tự'})
	@MaxLength(200, {message: 'Mô tả không được vượt quá 200 ký tự'})
	@ApiProperty({
		description: 'Mô tả về cây phả hệ',
		example:
			'Đây là cây phả hệ dành cho gia đình và bạn bè, hoạt động hằng tuần.',
		minLength: 20,
		maxLength: 200,
	})
	description: string;

	@Column({
		type: 'enum',
		enum: FAMILY_TREE_STATUS,
		default: FAMILY_TREE_STATUS.unpublished,
	})
	@IsEnum(FAMILY_TREE_STATUS, {message: 'Trạng thái dự án không hợp lệ'})
	@ApiProperty({
		description: 'Trạng thái dự án',
		enum: FAMILY_TREE_STATUS,
		example: FAMILY_TREE_STATUS.unpublished,
	})
	status: FAMILY_TREE_STATUS;

	@CreateDateColumn()
	@ApiProperty({
		description: 'Thời gian tạo cây phả hệ',
		example: '2024-12-25T12:00:00Z',
	})
	createdAt: Date;

	@UpdateDateColumn()
	@ApiProperty({
		description: 'Thời gian cập nhật cây phả hệ gần nhất',
		example: '2024-12-25T12:00:00Z',
	})
	updatedAt: Date;

	@DeleteDateColumn()
	@ApiProperty({
		description: 'Thời gian xóa cây phả hệ (nếu có)',
		example: null,
	})
	deletedAt: Date;

	/**
	 * RELATION
	 */
	@ManyToOne(() => Account, (Account) => Account[RE_RELATION])
	[RE_ACCOUNT]: Account;

	@OneToMany(() => Member, (Member) => Member[RE_FAMILY_TREE])
	[RE_MEMBER]: Member[];
}
