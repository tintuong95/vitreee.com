import { Member } from 'src/entities/member';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateMemberDTO, UpdateMemberDTO } from 'src/dto/member.dto';
export declare class MemberProvider {
    private memberRepository;
    constructor(memberRepository: Repository<Member>);
    findAllAsync(accountId: string, request: Request): Promise<{
        count: number;
        list: Member[];
        currentPage: number;
        perPage: number;
    }>;
    findOneAsync(accountId: string, id: string): Promise<Member | null>;
    addAsync(accountId: string, createMemberDTO: CreateMemberDTO): Promise<Member>;
    updateAsync(accountId: string, id: string, update: UpdateMemberDTO): Promise<Member>;
    removeAsync(accountId: string, id: string): Promise<string>;
    restoreAsync(accountId: string, id: string): Promise<string>;
}
