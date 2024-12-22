import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAccountDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  @MaxLength(25)
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  @MaxLength(100)
  password: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Expose()
  status: number;


}

export class UpdateAccountDTO extends PartialType(CreateAccountDTO) { }