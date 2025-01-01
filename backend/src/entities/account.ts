import {ApiProperty} from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import {Exclude} from 'class-transformer';
import {
	IsDateString,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
import {RE_ACCOUNT, RE_FAMILY_TREE, RE_MEMBER, RE_RELATION} from 'src/contants';
import {ACCOUNT_STATUS} from 'src/types/account.type';
import {GENDER_TYPE} from 'src/types/index.type';
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import {FamilyTree} from './family-tree';
import {Member} from './member';
import {Relation} from './relation';
@Entity()
export class Account {
	@PrimaryGeneratedColumn()
	@ApiProperty({
		description: 'ID duy nhất của người dùng (Number)',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	id: number;

	@Column({type: 'varchar', length: 100})
	@MinLength(5, {message: 'Email phải có ít nhất 5 ký tự'})
	@MaxLength(100, {message: 'Email không được vượt quá 100 ký tự'})
	@IsEmail({}, {message: 'Email không hợp lệ'})
	@ApiProperty({
		description: 'Địa chỉ email của người dùng',
		example: 'test@example.com',
	})
	email: string;

	@Column()
	@MinLength(6, {message: 'Mật khẩu phải có ít nhất 6 ký tự'})
	@IsString({message: 'Mật khẩu phải là chuỗi ký tự'})
	@IsNotEmpty({message: 'Mật khẩu không được để trống'})
	@ApiProperty({
		description: 'Mật khẩu của người dùng',
		example: 'password123',
	})
	@Exclude()
	password: string;

	@Column()
	@MinLength(2, {message: 'Họ và tên phải có ít nhất 2 ký tự'})
	@MaxLength(50, {message: 'Họ và tên không được vượt quá 50 ký tự'})
	@IsString({message: 'Họ và tên phải là chuỗi ký tự'})
	@ApiProperty({
		description: 'Họ và tên của người dùng',
		example: 'Nguyen Van A',
	})
	fullName: string;

	@Column()
	@Matches(/^[0-9]{10,15}$/, {
		message: 'Số điện thoại phải có độ dài từ 10 đến 15 chữ số',
	})
	@IsString({message: 'Số điện thoại phải là chuỗi ký tự'})
	@ApiProperty({
		description: 'Số điện thoại của người dùng',
		example: '0909123456',
	})
	phone: string;

	@Column()
	@IsOptional()
	@IsString({message: 'Ảnh phải là một chuỗi ký tự'})
	@ApiProperty({
		description: 'Ảnh đại diện của người dùng (URL)',
		example: 'https://example.com/photo.jpg',
	})
	photo: string;

	@Column()
	@IsDateString(
		{},
		{message: 'Ngày sinh phải là định dạng ngày hợp lệ (ISO8601)'}
	)
	@ApiProperty({
		description: 'Ngày sinh của người dùng (YYYY-MM-DD)',
		example: '1990-01-01',
	})
	dateOfBirth: string;

	@Column({
		type: 'enum',
		enum: GENDER_TYPE,
		default: GENDER_TYPE.Male,
	})
	@IsEnum(GENDER_TYPE, {message: 'Giới tính không hợp lệ'})
	@ApiProperty({
		description: 'Giới tính của người dùng',
		enum: GENDER_TYPE,
		example: GENDER_TYPE.Male,
	})
	gender: GENDER_TYPE;

	@Column({
		type: 'enum',
		enum: ACCOUNT_STATUS,
		default: ACCOUNT_STATUS.pending,
	})
	@IsEnum(ACCOUNT_STATUS, {message: 'Trạng thái tài khoản không hợp lệ'})
	@ApiProperty({
		description: 'Trạng thái tài khoản của người dùng',
		enum: ACCOUNT_STATUS,
		example: ACCOUNT_STATUS.actived,
	})
	status: ACCOUNT_STATUS;

	@CreateDateColumn()
	@ApiProperty({
		description: 'Thời gian tạo người dùng',
		example: '2024-12-25T12:00:00Z',
	})
	createdAt: Date;

	@UpdateDateColumn()
	@ApiProperty({
		description: 'Thời gian cập nhật người dùng gần nhất',
		example: '2024-12-25T12:00:00Z',
	})
	updatedAt: Date;

	@DeleteDateColumn()
	@ApiProperty({
		description: 'Thời gian xóa người dùng (nếu có)',
		example: null,
	})
	deletedAt: Date;

	@BeforeInsert()
	hash() {
		this.password = bcrypt.hashSync(this.password, 10);
	}

	isTruePassword(password: string) {
		return bcrypt.compareSync(password, this.password); // true
	}

	/**
	 * relations
	 */

	@OneToMany(() => Member, (Member) => Member[RE_ACCOUNT])
	[RE_MEMBER]: Member[];

	@OneToMany(() => FamilyTree, (FamilyTree) => FamilyTree[RE_ACCOUNT])
	[RE_FAMILY_TREE]: FamilyTree[];

	@OneToMany(() => Relation, (Relation) => Relation[RE_ACCOUNT])
	[RE_RELATION]: Relation[];
}
