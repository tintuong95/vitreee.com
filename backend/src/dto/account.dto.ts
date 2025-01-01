import {ApiProperty} from '@nestjs/swagger';
import {
	IsDateString,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsNumber,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
import {ACCOUNT_STATUS} from 'src/types/account.type';
import {GENDER_TYPE} from 'src/types/index.type';

export class CreateAccountDto {
	@IsEmail({}, {message: 'Email không hợp lệ'})
	@MinLength(5, {message: 'Email phải có ít nhất 5 ký tự'})
	@MaxLength(100, {message: 'Email không được vượt quá 100 ký tự'})
	@ApiProperty({description: 'Địa chỉ email của người dùng'})
	email: string;

	@IsString({message: 'Mật khẩu phải là chuỗi ký tự'})
	@IsNotEmpty({message: 'Mật khẩu không được để trống'})
	@MinLength(6, {message: 'Mật khẩu phải có ít nhất 6 ký tự'})
	@ApiProperty({description: 'Mật khẩu của người dùng'})
	password: string;

	@IsString({message: 'Họ và tên phải là chuỗi ký tự'})
	@MinLength(2, {message: 'Họ và tên phải có ít nhất 2 ký tự'})
	@MaxLength(50, {message: 'Họ và tên không được vượt quá 50 ký tự'})
	@ApiProperty({description: 'Họ và tên của người dùng'})
	fullName: string;

	@Matches(/^[0-9]{10,15}$/, {
		message: 'Số điện thoại phải có độ dài từ 10 đến 15 chữ số',
	})
	@IsString({message: 'Số điện thoại phải là chuỗi ký tự'})
	@ApiProperty({description: 'Số điện thoại của người dùng'})
	phone: string;

	@IsOptional()
	@IsString({message: 'Ảnh phải là một chuỗi ký tự'})
	@ApiProperty({
		description: 'Ảnh đại diện của người dùng (URL)',
		required: false,
	})
	photo?: string;

	@IsDateString(
		{},
		{message: 'Ngày sinh phải là định dạng ngày hợp lệ (ISO8601)'}
	)
	@ApiProperty({description: 'Ngày sinh của người dùng (YYYY-MM-DD)'})
	dateOfBirth: string;

	@IsEnum(GENDER_TYPE, {message: 'Giới tính không hợp lệ'})
	@ApiProperty({description: 'Giới tính của người dùng', enum: GENDER_TYPE})
	gender: GENDER_TYPE;

	@IsEnum(ACCOUNT_STATUS, {message: 'Trạng thái tài khoản không hợp lệ'})
	@ApiProperty({
		description: 'Trạng thái tài khoản của người dùng',
		enum: ACCOUNT_STATUS,
	})
	status: ACCOUNT_STATUS;
}

export class UpdateAccountDto {
	@IsEmail({}, {message: 'Email không hợp lệ'})
	@MinLength(5, {message: 'Email phải có ít nhất 5 ký tự'})
	@MaxLength(100, {message: 'Email không được vượt quá 100 ký tự'})
	@ApiProperty({description: 'Địa chỉ email của người dùng'})
	email: string;

	@IsOptional()
	@IsString({message: 'Họ và tên phải là chuỗi ký tự'})
	@MinLength(2, {message: 'Họ và tên phải có ít nhất 2 ký tự'})
	@MaxLength(50, {message: 'Họ và tên không được vượt quá 50 ký tự'})
	@ApiProperty({description: 'Họ và tên của người dùng', required: false})
	fullName?: string;

	@IsOptional()
	@Matches(/^[0-9]{10,15}$/, {
		message: 'Số điện thoại phải có độ dài từ 10 đến 15 chữ số',
	})
	@IsString({message: 'Số điện thoại phải là chuỗi ký tự'})
	@ApiProperty({description: 'Số điện thoại của người dùng', required: false})
	phone?: string;

	@IsOptional()
	@IsString({message: 'Ảnh phải là một chuỗi ký tự'})
	@ApiProperty({
		description: 'Ảnh đại diện của người dùng (URL)',
		required: false,
	})
	photo?: string;

	@IsOptional()
	@IsDateString(
		{},
		{message: 'Ngày sinh phải là định dạng ngày hợp lệ (ISO8601)'}
	)
	@ApiProperty({
		description: 'Ngày sinh của người dùng (YYYY-MM-DD)',
		required: false,
	})
	dateOfBirth?: string;

	@IsOptional()
	@IsEnum(GENDER_TYPE, {message: 'Giới tính không hợp lệ'})
	@ApiProperty({
		description: 'Giới tính của người dùng',
		enum: GENDER_TYPE,
		required: false,
	})
	gender?: GENDER_TYPE;

	@IsOptional()
	@IsEnum(ACCOUNT_STATUS, {message: 'Trạng thái tài khoản không hợp lệ'})
	@ApiProperty({
		description: 'Trạng thái tài khoản của người dùng',
		enum: ACCOUNT_STATUS,
		required: false,
	})
	status?: ACCOUNT_STATUS;
}

export class AccountResponseDto {
	@IsNumber()
	@ApiProperty({description: 'ID duy nhất của người dùng (Number)'})
	id: number;

	@ApiProperty({description: 'Địa chỉ email của người dùng'})
	email: string;

	@ApiProperty({description: 'Họ và tên của người dùng'})
	fullName: string;

	@ApiProperty({description: 'Số điện thoại của người dùng'})
	phone: string;

	@ApiProperty({
		description: 'Ảnh đại diện của người dùng (URL)',
		required: false,
	})
	photo: string;

	@ApiProperty({description: 'Ngày sinh của người dùng (YYYY-MM-DD)'})
	dateOfBirth: string;

	@ApiProperty({description: 'Giới tính của người dùng', enum: GENDER_TYPE})
	gender: GENDER_TYPE;

	@ApiProperty({
		description: 'Trạng thái tài khoản của người dùng',
		enum: ACCOUNT_STATUS,
	})
	status: ACCOUNT_STATUS;
}
export class LoginDto {
	@ApiProperty({
		description: 'Địa chỉ email của người dùng',
		example: 'test@example.com', // Dữ liệu mẫu cho trường email
	})
	@IsEmail({}, {message: 'Email không hợp lệ'})
	@IsNotEmpty({message: 'Email không được để trống'})
	email: string;

	@ApiProperty({
		description: 'Mật khẩu của người dùng',
		example: 'password123', // Dữ liệu mẫu cho trường password
	})
	@IsString({message: 'Mật khẩu phải là chuỗi ký tự'})
	@MinLength(6, {message: 'Mật khẩu phải có ít nhất 6 ký tự'})
	@IsNotEmpty({message: 'Mật khẩu không được để trống'})
	password: string;
}
