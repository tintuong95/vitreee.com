import {ApiProperty} from '@nestjs/swagger';
import {
	IsDateString,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
import {RE_ACCOUNT, RE_FAMILY_TREE, RE_MEMBER, RE_RELATION} from 'src/contants';
import {GENDER_TYPE} from 'src/types/index.type';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import {Account} from './account';
import {FamilyTree} from './family-tree';
import {Relation} from './relation';

@Entity()
export class Member {
	@PrimaryGeneratedColumn()
	@ApiProperty({
		description: 'ID của mối quan hệ ',
		example: '1',
	})
	id: number;

	@Column()
	@IsNumber({}, {message: 'ID tài khoản phải là Number hợp lệ'})
	@IsNotEmpty({message: 'ID tài khoản không được để trống'})
	@ApiProperty({
		description: 'ID tài khoản liên kết với thành viên',
		example: '123e4567-e89b-12d3-a456-426614174001',
	})
	accountId: number;

	@Column()
	@IsNumber({}, {message: 'ID tài khoản phải là Number hợp lệ'})
	@IsNotEmpty({message: 'ID tài khoản không được để trống'})
	@ApiProperty({
		description: 'ID tài khoản liên kết với thành viên',
		example: '123e4567-e89b-12d3-a456-426614174001',
	})
	familyTreeId: number;

	@Column()
	@IsString({message: 'Họ và tên phải là chuỗi'})
	@IsNotEmpty({message: 'Họ và tên không được để trống'})
	@MinLength(3, {message: 'Họ và tên phải có ít nhất 3 ký tự'})
	@MaxLength(50, {message: 'Họ và tên không được vượt quá 50 ký tự'})
	@ApiProperty({
		description: 'Họ và tên của thành viên',
		example: 'Nguyễn Văn A',
		minLength: 3,
		maxLength: 50,
	})
	fullName: string;

	@Column()
	@IsString({message: 'Số điện thoại phải là chuỗi'})
	@Matches(/^[0-9]{10,15}$/, {
		message: 'Số điện thoại phải có độ dài từ 10 đến 15 chữ số',
	})
	@IsNotEmpty({message: 'Số điện thoại không được để trống'})
	@ApiProperty({
		description: 'Số điện thoại của thành viên',
		example: '0123456789',
	})
	phone: string;

	@Column()
	@IsEmail({}, {message: 'Email không hợp lệ'})
	@IsNotEmpty({message: 'Email không được để trống'})
	@ApiProperty({
		description: 'Email của thành viên',
		example: 'example@example.com',
	})
	email: string;

	@Column()
	@IsString({message: 'Địa chỉ phải là chuỗi'})
	@IsNotEmpty({message: 'Địa chỉ không được để trống'})
	@MinLength(10, {message: 'Địa chỉ phải có ít nhất 10 ký tự'})
	@MaxLength(100, {message: 'Địa chỉ không được vượt quá 100 ký tự'})
	@ApiProperty({
		description: 'Địa chỉ của thành viên',
		example: '123 Đường ABC, Thành phố XYZ',
	})
	address: string;

	@Column()
	@IsOptional()
	@IsString({message: 'Avatar phải là chuỗi'})
	@ApiProperty({
		description: 'URL của avatar thành viên',
		example: 'https://example.com/avatar.png',
	})
	avatar: string;

	@Column()
	@IsOptional()
	@IsString({message: 'Mô tả phải là chuỗi'})
	@MinLength(10, {message: 'Mô tả phải có ít nhất 10 ký tự'})
	@MaxLength(200, {message: 'Mô tả không được vượt quá 200 ký tự'})
	@ApiProperty({
		description: 'Mô tả về thành viên',
		example: 'Thành viên năng động, yêu thích công việc nhóm.',
	})
	description: string;

	@Column()
	@IsDateString(
		{},
		{message: 'Ngày sinh phải là định dạng ngày hợp lệ (ISO8601)'}
	)
	@IsOptional()
	@ApiProperty({
		description: 'Ngày sinh của thành viên',
		example: '1990-01-01',
	})
	birth_date: string;

	@Column()
	@IsDateString(
		{},
		{message: 'Ngày mất phải là định dạng ngày hợp lệ (ISO8601)'}
	)
	@IsOptional()
	@ApiProperty({
		description: 'Ngày mất của thành viên (nếu có)',
		example: '2050-01-01',
	})
	dead_date: string;

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

	@Column({default: 0})
	@IsNumber({}, {message: 'Loại thành viên phải là số'})
	@ApiProperty({
		description: 'Loại của thành viên (0: Hoạt động, 1: Không hoạt động)',
		example: 0,
	})
	type: number;

	@CreateDateColumn()
	@ApiProperty({
		description: 'Thời gian tạo thành viên',
		example: '2024-12-25T12:00:00Z',
	})
	createdAt: Date;

	@UpdateDateColumn()
	@ApiProperty({
		description: 'Thời gian cập nhật thành viên gần nhất',
		example: '2024-12-25T12:00:00Z',
	})
	updatedAt: Date;

	@DeleteDateColumn()
	@ApiProperty({
		description: 'Thời gian xóa thành viên (nếu có)',
		example: null,
	})
	deletedAt: Date;

	/**
	 * RELATION
	 */
	@ManyToOne(() => Account, (Account) => Account[RE_RELATION])
	[RE_ACCOUNT]: Account;

	@ManyToOne(() => FamilyTree, (FamilyTree) => FamilyTree[RE_MEMBER])
	[RE_FAMILY_TREE]: FamilyTree;

	@OneToOne(() => Relation, (relation) => relation.member_first_id)
	@ApiProperty({
		description: 'Mối quan hệ liên kết với thành viên đầu tiên',
		type: () => Relation,
	})
	relation_first: Relation;

	@OneToOne(() => Relation, (relation) => relation.member_second_id)
	@ApiProperty({
		description: 'Mối quan hệ liên kết với thành viên thứ 2',
		type: () => Relation,
	})
	relation_second: Relation;
}
