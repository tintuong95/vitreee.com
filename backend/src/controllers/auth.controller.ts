import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { classToPlain, plainToClass } from 'class-transformer';
import { Response } from 'express';
import { AccountDetail, AccountDetailDTO } from 'src/auth/account.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-guard.provider';
import {
  AccountResponseDto,
  CreateAccountDto,
  LoginDto,
} from 'src/dto/account.dto';
import { Account } from 'src/entities/account';
import { AccountProvider } from 'src/providers/account.provider';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private _accountProvider: AccountProvider,
  ) {}

  /**
   *
   * @param signin
   * @returns
   */
  @Post('login')
  async authLoginAsync(
    @Body() signin: LoginDto,
    @Res() response: Response,
  ): Promise<any> {
    try {
      let account = await this._accountProvider.signInAsync(
        signin.email,
        signin.password,
      );
      const temp = { ...account };
      delete temp.password;
      if (account) {
        const accessToken = this.jwtService.sign(temp);
        return response.status(HttpStatus.OK).json({
          account: temp,
          accessToken,
          time: new Date().toString(),
          message: 'Logging successfully!',
        });
      } else {
        return response.status(HttpStatus.FORBIDDEN).json({
          message: 'FORBIDDEN!',
        });
      }
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'BAD REQUEST!',
      });
    }
  }

  /**
   *
   * @param signup
   * @param response
   * @returns
   */
  @Post('signup')
  async authSignupAsync(
    @Body() signup: CreateAccountDto,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const account = await this._accountProvider.addAsync(signup);
      if (account) {
        const object = {
          id: account.id,
          name: account.email,
          status: account.status,
          createdAt: account.createdAt,
          updatedAt: account.updatedAt,
        };
        const accessToken = this.jwtService.sign(object);
        return response.status(HttpStatus.OK).json({
          account: object,
          accessToken,
          time: new Date().toString(),
          message: 'Signup successfully!',
        });
      } else {
        return response.status(HttpStatus.FORBIDDEN).json({
          message: 'FORBIDDEN!',
        });
      }
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Signup failture!',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @AccountDetail() user: AccountDetailDTO,
    @Res() response: Response,
  ) {
    if (!user)
      return response.status(HttpStatus.FORBIDDEN).json({
        message: 'FORBIDDEN!',
      });
    const rs = await this._accountProvider.findOneAsync(user.id);
    delete rs.password;

    return response.status(HttpStatus.OK).json({
      account: rs,
      message: 'Profile successfully!',
    });
  }
}
