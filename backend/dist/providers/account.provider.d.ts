import { Account } from 'src/entities/account';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateAccountDTO, UpdateAccountDTO } from 'src/dto/account.dto';
export declare class AccountProvider {
    private accountRepository;
    constructor(accountRepository: Repository<Account>);
    findAllAsync(request: Request): Promise<{
        count: number;
        data: Account[];
    }>;
    findOneAsync(id: string): Promise<Account | null>;
    addAsync(createAccountDTO: CreateAccountDTO): Promise<Account>;
    updateAsync(id: string, update: UpdateAccountDTO): Promise<Account>;
    removeAsync(id: number): Promise<import("typeorm").UpdateResult>;
    restoreAsync(id: number): Promise<import("typeorm").UpdateResult>;
    signInAsync(email: string, password: string): Promise<Account>;
}
