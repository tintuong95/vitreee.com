import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAccountDTO } from 'src/dto/account.dto';
import { AccountProvider } from 'src/providers/account.provider';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private _accountProvider: AccountProvider
  ) { }

  /**
   * 
   * @param signin 
   * @returns 
   */
  @Post('login')
  async authLoginAsync(@Body() signin: { email: string, password: string }): Promise<any> {
    try {
      const account = await this._accountProvider.signInAsync(signin.email, signin.password);
      if (account) {
        const object = {
          id: account.id,
          name: account.email,
          status: account.status,
          createdAt: account.createdAt,
          updatedAt: account.updatedAt,
        }
        const accessToken = this.jwtService.sign(object);
        return {
          acoount: object,
          accessToken,
          time: new Date().toString(),
          message: "Logging successfully!"
        };
      } else {
        throw new HttpException('FORBIEDEN', HttpStatus.FORBIDDEN);
      }
    } catch (error) {

      throw new HttpException(
        error.sqlMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('signup')
  async authSignupAsync(@Body() signup: CreateAccountDTO): Promise<any> {
    try {
      const account = await this._accountProvider.addAsync(signup);
      if (account) {
        const object = {
          id: account.id,
          name: account.email,
          status: account.status,
          createdAt: account.createdAt,
          updatedAt: account.updatedAt,
        }
        const accessToken = this.jwtService.sign(object);
        return {
          acoount: object,
          accessToken,
          time: new Date().toString(),
          message: "Signup successfully!"
        };
      } else {
        throw new HttpException('FORBIEDEN', HttpStatus.FORBIDDEN);
      }
    } catch (error) {

      throw new HttpException(
        error.sqlMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}