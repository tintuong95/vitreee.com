import { JwtService } from '@nestjs/jwt';
import { CreateAccountDTO } from 'src/dto/account.dto';
import { AccountProvider } from 'src/providers/account.provider';
export declare class AuthController {
    private jwtService;
    private _accountProvider;
    constructor(jwtService: JwtService, _accountProvider: AccountProvider);
    authLoginAsync(signin: {
        email: string;
        password: string;
    }): Promise<any>;
    authSignupAsync(signup: CreateAccountDTO): Promise<any>;
}
