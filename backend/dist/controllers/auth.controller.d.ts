import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AccountDetailDTO } from 'src/auth/account.decorator';
import { CreateAccountDto, LoginDto } from 'src/dto/account.dto';
import { AccountProvider } from 'src/providers/account.provider';
export declare class AuthController {
    private jwtService;
    private _accountProvider;
    constructor(jwtService: JwtService, _accountProvider: AccountProvider);
    authLoginAsync(signin: LoginDto, response: Response): Promise<any>;
    authSignupAsync(signup: CreateAccountDto, response: Response): Promise<any>;
    getProfile(user: AccountDetailDTO, response: Response): Promise<Response<any, Record<string, any>>>;
}
