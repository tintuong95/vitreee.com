import { Request, Response } from 'express';
import { AccountDetailDTO } from 'src/auth/account.decorator';
import { CreateMemberDTO, UpdateMemberDTO } from 'src/dto/member.dto';
import { MemberProvider } from 'src/providers/member.provider';
export declare class MemberController {
    private _memberProvider;
    constructor(_memberProvider: MemberProvider);
    findAll(request: Request, response: Response, _account: AccountDetailDTO): Promise<any>;
    findOne(id: number, response: Response, _account: AccountDetailDTO): Promise<any>;
    createAsync(create: CreateMemberDTO, _account: AccountDetailDTO, response: Response): Promise<any>;
    updateAsync(update: UpdateMemberDTO, id: number, response: Response, _account: AccountDetailDTO): Promise<any>;
    removeAsync(id: number, response: Response, _account: AccountDetailDTO): Promise<any>;
    restoreAsync(id: number, response: Response, _account: AccountDetailDTO): Promise<any>;
}
