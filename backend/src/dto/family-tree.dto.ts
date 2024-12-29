import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	MinLength,
	MaxLength,
	IsEnum,
	IsOptional,
} from 'class-validator';
import {FAMILY_TREE_STATUS} from 'src/types/family-tree.type';

export class CreateFamilyTreeDTO {
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

	@IsNotEmpty({message: 'Địa chỉ không được để trống'})
	@IsString({message: 'Địa chỉ phải là chuỗi'})
	@MinLength(10, {message: 'Địa chỉ phải có ít nhất 10 ký tự'})
	@MaxLength(100, {message: 'Địa chỉ không được vượt quá 100 ký tự'})
	@ApiProperty({
		description: 'Địa chỉ của cây phả hệ',
		example: '123 Đường ABC, Thành phố XYZ',
		minLength: 10,
		maxLength: 100,
	})
	address: string;

	@IsNotEmpty({message: 'Mô tả không được để trống'})
	@IsString({message: 'Mô tả phải là chuỗi'})
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

	// @IsEnum(FAMILY_TREE_STATUS, {message: 'Trạng thái dự án không hợp lệ'})
	// @ApiProperty({
	// 	description: 'Trạng thái dự án',
	// 	enum: FAMILY_TREE_STATUS,
	// 	example: FAMILY_TREE_STATUS.unpublished,
	// })
	// status: FAMILY_TREE_STATUS;
}

export class UpdateFamilyTreeDTO {
	@IsOptional()
	@IsString({message: 'Tên cây phả hệ phải là chuỗi'})
	@MinLength(3, {message: 'Tên cây phả hệ phải có ít nhất 3 ký tự'})
	@MaxLength(50, {message: 'Tên cây phả hệ không được vượt quá 50 ký tự'})
	@ApiPropertyOptional({
		description: 'Tên của cây phả hệ',
		example: 'cây phả hệ Gia đình',
		minLength: 3,
		maxLength: 50,
	})
	name?: string;

	@IsOptional()
	@IsString({message: 'Địa chỉ phải là chuỗi'})
	@MinLength(10, {message: 'Địa chỉ phải có ít nhất 10 ký tự'})
	@MaxLength(100, {message: 'Địa chỉ không được vượt quá 100 ký tự'})
	@ApiPropertyOptional({
		description: 'Địa chỉ của cây phả hệ',
		example: '123 Đường ABC, Thành phố XYZ',
		minLength: 10,
		maxLength: 100,
	})
	address?: string;

	@IsOptional()
	@IsString({message: 'Mô tả phải là chuỗi'})
	@MinLength(20, {message: 'Mô tả phải có ít nhất 20 ký tự'})
	@MaxLength(200, {message: 'Mô tả không được vượt quá 200 ký tự'})
	@ApiPropertyOptional({
		description: 'Mô tả về cây phả hệ',
		example:
			'Đây là cây phả hệ dành cho gia đình và bạn bè, hoạt động hằng tuần.',
		minLength: 20,
		maxLength: 200,
	})
	description?: string;

	@IsOptional()
	@IsEnum(FAMILY_TREE_STATUS, {message: 'Trạng thái dự án không hợp lệ'})
	@ApiPropertyOptional({
		description: 'Trạng thái dự án',
		enum: FAMILY_TREE_STATUS,
		example: FAMILY_TREE_STATUS.unpublished,
	})
	status?: FAMILY_TREE_STATUS;
}
