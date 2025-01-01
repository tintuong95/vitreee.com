import {ApiProperty, PartialType} from '@nestjs/swagger';
import {IsEnum, IsNotEmpty, IsOptional, IsNumber} from 'class-validator';
import {RELATION_MEMBER_TYPE} from 'src/types/relation.type';

export class CreateRelationDTO {
	@IsOptional()
	@IsEnum(RELATION_MEMBER_TYPE, {message: 'Quan hệ không hợp lệ'})
	@ApiProperty({
		description: 'Quan hệ của người dùng',
		enum: RELATION_MEMBER_TYPE,
		required: false,
	})
	type?: RELATION_MEMBER_TYPE;

	@IsNumber({}, {message: 'ID tài khoản phải là Number hợp lệ'})
	@IsNotEmpty({message: 'ID tài khoản không được để trống'})
	@ApiProperty({
		description: 'ID của thành viên đầu tiên',
		example: 1,
	})
	member_first_id: number;

	@IsNumber({}, {message: 'ID tài khoản phải là Number hợp lệ'})
	@IsNotEmpty({message: 'ID tài khoản không được để trống'})
	@ApiProperty({
		description: 'ID của thành viên thứ hai',
		example: 2,
	})
	member_second_id: number;

	@IsNotEmpty({message: 'ID tài khoản không được để trống'})
	@ApiProperty({
		description: 'ID tài khoản liên kết với thành viên',
		example: '123e4567-e89b-12d3-a456-426614174001',
	})
	familyTreeId: number;
}

export class UpdateRelationDTO extends PartialType(CreateRelationDTO) {}
