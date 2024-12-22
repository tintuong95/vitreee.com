import { Request } from 'express';
import { CreateAccountDTO, UpdateAccountDTO } from 'src/dto/account.dto';
import { AccountProvider } from 'src/providers/account.provider';
export declare class AccountController {
    private _accountProvider;
    constructor(_accountProvider: AccountProvider);
    findAll(request: Request): Promise<any>;
    findOne(id: string): Promise<any>;
    createAsync(create: CreateAccountDTO): Promise<any>;
    updateAsync(update: UpdateAccountDTO, id: string): Promise<any>;
    removeAsync(id: number): Promise<any>;
    restoreAsync(id: number): Promise<any>;
}
