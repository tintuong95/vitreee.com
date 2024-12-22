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
import { CreateRelationDTO, UpdateRelationDTO } from 'src/dto/relation.dto';
import { RelationProvider } from 'src/providers/relation.provider';



@Controller('relation')
export class RelationController {
  /**
   * 
   * @param _relationProvider 
   */
  constructor(private _relationProvider: RelationProvider) { }

  /**
   * 
   * @param request 
   * @returns 
   */
  @Get()
  async findAll(@Req() request: Request): Promise<any> {
    try {
      return await this._relationProvider.findAllAsync(request);
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
      return await this._relationProvider.findOneAsync(id);
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
  async createAsync(@Body() create: CreateRelationDTO): Promise<any> {
    try {
      return await this._relationProvider.addAsync(create);
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
    @Body() update: UpdateRelationDTO,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this._relationProvider.updateAsync(id, update);
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
      return await this._relationProvider.removeAsync(id);
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
      return await this._relationProvider.restoreAsync(id);
    } catch (error) {
      throw new HttpException(
        error.sqlMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}