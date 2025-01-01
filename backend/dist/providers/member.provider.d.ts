import { Member } from 'src/entities/member';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateMemberDTO, UpdateMemberDTO } from 'src/dto/member.dto';
export declare class MemberProvider {
    private memberRepository;
    constructor(memberRepository: Repository<Member>);
    findAllAsync(accountId: number, request: Request): Promise<{
        count: number;
        list: Member[];
        currentPage: number;
        perPage: number;
    }>;
    findOneAsync(accountId: number, id: number): Promise<Member | null>;
    addAsync(accountId: number, createMemberDTO: CreateMemberDTO): Promise<Member>;
    updateAsync(accountId: number, id: number, update: UpdateMemberDTO): Promise<Member>;
    removeAsync(accountId: number, id: number): Promise<string>;
    restoreAsync(accountId: number, id: number): Promise<string>;
}
