import { Member } from 'src/entities/member';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateMemberDTO, UpdateMemberDTO } from 'src/dto/member.dto';
export declare class MemberProvider {
    private memberRepository;
    constructor(memberRepository: Repository<Member>);
    findAllAsync(request: Request): Promise<{
        count: number;
        data: Member[];
    }>;
    findOneAsync(id: string): Promise<Member | null>;
    addAsync(createMemberDTO: CreateMemberDTO): Promise<Member>;
    updateAsync(id: string, update: UpdateMemberDTO): Promise<Member>;
    removeAsync(id: number): Promise<import("typeorm").UpdateResult>;
    restoreAsync(id: number): Promise<import("typeorm").UpdateResult>;
}
