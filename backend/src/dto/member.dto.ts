import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateMemberDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  @MaxLength(25)
  fullName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  @MaxLength(100)
  phone: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  @MaxLength(100)
  address: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  avatar: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  @MaxLength(100)
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  @MaxLength(100)
  birth_date: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  @MaxLength(100)
  dead_date: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Expose()
  gender: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Expose()
  status: number;


}

export class UpdateMemberDTO extends PartialType(CreateMemberDTO) { }