import {ApiProperty, PartialType} from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsUUID,
	IsNumber,
	Min,
	Max,
	IsOptional,
	IsEnum,
} from 'class-validator';
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

	@IsUUID('all', {message: 'ID tài khoản phải là UUID hợp lệ'})
	@IsNotEmpty({message: 'ID tài khoản không được để trống'})
	@ApiProperty({
		description: 'ID của thành viên đầu tiên',
		example: 1,
	})
	member_first_id: string;

	@IsUUID('all', {message: 'ID tài khoản phải là UUID hợp lệ'})
	@IsNotEmpty({message: 'ID tài khoản không được để trống'})
	@ApiProperty({
		description: 'ID của thành viên thứ hai',
		example: 2,
	})
	member_second_id: string;
}

export class UpdateRelationDTO extends PartialType(CreateRelationDTO) {}
