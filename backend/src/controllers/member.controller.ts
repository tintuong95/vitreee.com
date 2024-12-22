import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateMemberDTO, UpdateMemberDTO } from 'src/dto/member.dto';
import { MemberProvider } from 'src/providers/member.provider';



@Controller('member')
export class MemberController {
  /**
   * 
   * @param _memberProvider 
   */
  constructor(private _memberProvider: MemberProvider) { }

  /**
   * 
   * @param request 
   * @returns 
   */
  @Get()
  async findAll(@Req() request: Request): Promise<any> {
    try {
      return await this._memberProvider.findAllAsync(request);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.sqlMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    try {
      return await this._memberProvider.findOneAsync(id);
    } catch (error) {
      throw new HttpException(
        error.sqlMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 
   * @param create 
   * @returns 
   */
  @Post('create')
  async createAsync(@Body() create: CreateMemberDTO): Promise<any> {
    try {
      return await this._memberProvider.addAsync(create);
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error.sqlMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 
   * @param update 
   * @param id 
   * @returns 
   */
  @Post(':id/update')
  async updateAsync(
    @Body() update: UpdateMemberDTO,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this._memberProvider.updateAsync(id, update);
    } catch (error) {
      throw new HttpException(
        error.sqlMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  @Delete(':id/remove')
  async removeAsync(@Param('id') id: number): Promise<any> {
    try {
      return await this._memberProvider.removeAsync(id);
    } catch (error) {
      throw new HttpException(
        error.sqlMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  @Delete(':id/restore')
  async restoreAsync(@Param('id') id: number): Promise<any> {
    try {
      return await this._memberProvider.restoreAsync(id);
    } catch (error) {
      throw new HttpException(
        error.sqlMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}