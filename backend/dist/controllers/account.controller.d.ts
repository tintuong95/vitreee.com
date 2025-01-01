import { Request, Response } from 'express';
import { CreateAccountDto, UpdateAccountDto } from 'src/dto/account.dto';
import { AccountProvider } from 'src/providers/account.provider';
export declare class AccountController {
    private _accountProvider;
    constructor(_accountProvider: AccountProvider);
    findAll(request: Request, response: Response): Promise<any>;
    findOne(id: number, response: Response): Promise<any>;
    createAsync(create: CreateAccountDto, response: Response): Promise<any>;
    updateAsync(update: UpdateAccountDto, id: number, response: Response): Promise<any>;
    removeAsync(id: number, response: Response): Promise<any>;
    restoreAsync(id: number, response: Response): Promise<any>;
}
