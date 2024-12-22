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
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AccountDetail, AccountDetailDTO } from 'src/auth/account.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-guard.provider';
import { CreateFamilyTreeDTO, UpdateFamilyTreeDTO } from 'src/dto/family-tree.dto';
import { FamilyTreeProvider } from 'src/providers/family-tree.provider';



@Controller('familyTree')
@UseGuards(JwtAuthGuard)
export class FamilyTreeController {
  /**
   * 
   * @param _familyTreeProvider 
   */
  constructor(private _familyTreeProvider: FamilyTreeProvider) { }

  /**
   * 
   * @param request 
   * @returns 
   */
  @Get()
  async findAll(@Req() request: Request, @Res() response: Response,): Promise<any> {
    try {
      const find = await this._familyTreeProvider.findAllAsync(request);
      return response.status(HttpStatus.OK).json({
        message: 'All family-tree data found successfully',
        data: find
      })

    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error! family-tree not found!',
        error: 'Bad Request',
      });
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
      return await this._familyTreeProvider.findOneAsync(id);
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
  async createAsync(@Body() create: CreateFamilyTreeDTO, @AccountDetail() _account: AccountDetailDTO): Promise<any> {
    try {
      console.log("_account", _account)
      return await this._familyTreeProvider.addAsync(_account.id, create);
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
    @Body() update: UpdateFamilyTreeDTO,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this._familyTreeProvider.updateAsync(id, update);
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
      return await this._familyTreeProvider.removeAsync(id);
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
      return await this._familyTreeProvider.restoreAsync(id);
    } catch (error) {
      throw new HttpException(
        error.sqlMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}