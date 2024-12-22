import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFamilyTreeDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  @MaxLength(25)
  name: string;

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
  imageUrlCover: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  @MaxLength(1000)
  description: string;


  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Expose()
  status: number;


  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Expose()
  member: number;
}

export class UpdateFamilyTreeDTO extends PartialType(CreateFamilyTreeDTO) { }