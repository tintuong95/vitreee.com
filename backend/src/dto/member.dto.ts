import {ApiProperty, PartialType} from '@nestjs/swagger';
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
import {GENDER_TYPE} from 'src/types/index.type';

export class CreateMemberDTO {
	// @IsNumber({}, {message: 'ID tài khoản phải là Number hợp lệ'})
	@IsNotEmpty({message: 'ID tài khoản không được để trống'})
	@ApiProperty({
		description: 'ID tài khoản liên kết với thành viên',
		example: '123e4567-e89b-12d3-a456-426614174001',
	})
	familyTreeId: number;

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

	@IsEmail({}, {message: 'Email không hợp lệ'})
	@IsNotEmpty({message: 'Email không được để trống'})
	@ApiProperty({
		description: 'Email của thành viên',
		example: 'example@example.com',
	})
	email: string;

	@IsString({message: 'Địa chỉ phải là chuỗi'})
	@IsNotEmpty({message: 'Địa chỉ không được để trống'})
	@MinLength(10, {message: 'Địa chỉ phải có ít nhất 10 ký tự'})
	@MaxLength(100, {message: 'Địa chỉ không được vượt quá 100 ký tự'})
	@ApiProperty({
		description: 'Địa chỉ của thành viên',
		example: '123 Đường ABC, Thành phố XYZ',
	})
	address: string;

	@IsOptional()
	@IsString({message: 'Avatar phải là chuỗi'})
	@ApiProperty({
		description: 'URL của avatar thành viên',
		example: 'https://example.com/avatar.png',
	})
	avatar: string;

	@IsOptional()
	@IsString({message: 'Mô tả phải là chuỗi'})
	@MinLength(10, {message: 'Mô tả phải có ít nhất 10 ký tự'})
	@MaxLength(200, {message: 'Mô tả không được vượt quá 200 ký tự'})
	@ApiProperty({
		description: 'Mô tả về thành viên',
		example: 'Thành viên năng động, yêu thích công việc nhóm.',
	})
	description: string;

	@IsOptional()
	@IsDateString(
		{},
		{message: 'Ngày sinh phải là định dạng ngày hợp lệ (ISO8601)'}
	)
	@ApiProperty({
		description: 'Ngày sinh của thành viên',
		example: '1990-01-01',
	})
	birth_date: string;

	@IsOptional()
	@IsDateString(
		{},
		{message: 'Ngày mất phải là định dạng ngày hợp lệ (ISO8601)'}
	)
	@ApiProperty({
		description: 'Ngày mất của thành viên (nếu có)',
		example: '2050-01-01',
	})
	dead_date: string;

	@IsOptional()
	@IsEnum(GENDER_TYPE, {message: 'Giới tính không hợp lệ'})
	@ApiProperty({
		description: 'Giới tính của người dùng',
		enum: GENDER_TYPE,
		required: false,
	})
	gender?: GENDER_TYPE;

	@IsOptional()
	@IsNumber({}, {message: 'Loại thành viên không hợp lệ'})
	@ApiProperty({
		description: 'Loại thành viên',
		required: false,
	})
	type?: number;
}

export class UpdateMemberDTO extends PartialType(CreateMemberDTO) {}
