import { Account } from 'src/entities/account';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateAccountDto, UpdateAccountDto } from 'src/dto/account.dto';
export declare class AccountProvider {
    private accountRepository;
    constructor(accountRepository: Repository<Account>);
    findAllAsync(request: Request): Promise<{
        count: number;
        list: Account[];
        currentPage: number;
        perPage: number;
    }>;
    findOneAsync(id: string): Promise<Account | null>;
    addAsync(CreateAccountDto: CreateAccountDto): Promise<Account>;
    updateAsync(id: string, update: UpdateAccountDto): Promise<Account>;
    removeAsync(id: string): Promise<import("typeorm").UpdateResult>;
    restoreAsync(id: string): Promise<import("typeorm").UpdateResult>;
    signInAsync(email: string, password: string): Promise<Account>;
}
