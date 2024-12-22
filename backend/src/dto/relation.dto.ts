import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRelationDTO {
  @IsString()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Expose()
  type: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Expose()
  member_first_id: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Expose()
  member_second_id: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Expose()
  status: number;


}

export class UpdateRelationDTO extends PartialType(CreateRelationDTO) { }