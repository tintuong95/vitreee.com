import { Request } from 'express';
import { CreateMemberDTO, UpdateMemberDTO } from 'src/dto/member.dto';
import { MemberProvider } from 'src/providers/member.provider';
export declare class MemberController {
    private _memberProvider;
    constructor(_memberProvider: MemberProvider);
    findAll(request: Request): Promise<any>;
    findOne(id: string): Promise<any>;
    createAsync(create: CreateMemberDTO): Promise<any>;
    updateAsync(update: UpdateMemberDTO, id: string): Promise<any>;
    removeAsync(id: number): Promise<any>;
    restoreAsync(id: number): Promise<any>;
}
