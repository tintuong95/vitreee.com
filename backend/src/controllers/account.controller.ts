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
import { CreateAccountDTO, UpdateAccountDTO } from 'src/dto/account.dto';
import { AccountProvider } from 'src/providers/account.provider';



@Controller('account')
export class AccountController {
  /**
   * 
   * @param _accountProvider 
   */
  constructor(private _accountProvider: AccountProvider) { }

  /**
   * 
   * @param request 
   * @returns 
   */
  @Get()
  async findAll(@Req() request: Request): Promise<any> {
    try {
      return await this._accountProvider.findAllAsync(request);
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
      return await this._accountProvider.findOneAsync(id);
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
  async createAsync(@Body() create: CreateAccountDTO): Promise<any> {
    try {
      return await this._accountProvider.addAsync(create);
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
    @Body() update: UpdateAccountDTO,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this._accountProvider.updateAsync(id, update);
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
      return await this._accountProvider.removeAsync(id);
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
      return await this._accountProvider.restoreAsync(id);
    } catch (error) {
      throw new HttpException(
        error.sqlMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


}