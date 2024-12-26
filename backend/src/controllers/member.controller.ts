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
import { CreateMemberDTO, UpdateMemberDTO } from 'src/dto/member.dto';
import { MemberProvider } from 'src/providers/member.provider';

@Controller('member')
@UseGuards(JwtAuthGuard)
export class MemberController {
  /**
   *
   * @param _memberProvider
   */
  constructor(private _memberProvider: MemberProvider) {}

  /**
   *
   * @param request
   * @returns
   */
  @Get()
  async findAll(
    @Req() request: Request,
    @Res() response: Response,
    @AccountDetail() _account: AccountDetailDTO,
  ): Promise<any> {
    try {
      const find = await this._memberProvider.findAllAsync(
        _account.id,
        request,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Find data successfully!',
        data: find,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Find data failture!',
      });
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() response: Response,
    @AccountDetail() _account: AccountDetailDTO,
  ): Promise<any> {
    try {
      const find = await this._memberProvider.findOneAsync(_account.id, id);
      return response.status(HttpStatus.OK).json({
        message: 'Find data successfully!',
        data: find,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Find data failture!',
      });
    }
  }

  /**
   *
   * @param create
   * @returns
   */
  @Post('create')
  async createAsync(
    @Body() create: CreateMemberDTO,
    @AccountDetail() _account: AccountDetailDTO,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const find = await this._memberProvider.addAsync(_account.id, create);
      return response.status(HttpStatus.OK).json({
        message: 'Create successfully!',
        data: find,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Create failture!',
      });
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
    @Res() response: Response,
    @AccountDetail() _account: AccountDetailDTO,
  ): Promise<any> {
    try {
      const find = await this._memberProvider.updateAsync(
        _account.id,
        id,
        update,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Update successfully!',
        data: find,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Update failture!',
      });
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id/remove')
  async removeAsync(
    @Param('id') id: string,
    @Res() response: Response,
    @AccountDetail() _account: AccountDetailDTO,
  ): Promise<any> {
    try {
      const find = await this._memberProvider.removeAsync(_account.id, id);
      return response.status(HttpStatus.OK).json({
        message: 'Remove successfully!',
        data: find,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Remove failture!',
      });
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id/restore')
  async restoreAsync(
    @Param('id') id: string,
    @Res() response: Response,
    @AccountDetail() _account: AccountDetailDTO,
  ): Promise<any> {
    try {
      const result = await this._memberProvider.restoreAsync(_account.id, id);
      return response.status(HttpStatus.OK).json({
        message: 'Restore successfully!',
        data: result,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Restore failture!',
      });
    }
  }
}
