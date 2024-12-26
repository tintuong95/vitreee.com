import { Relation } from 'src/entities/relation';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateRelationDTO, UpdateRelationDTO } from 'src/dto/relation.dto';
export declare class RelationProvider {
    private relationRepository;
    constructor(relationRepository: Repository<Relation>);
    findAllAsync(accountId: string, request: Request): Promise<{
        count: number;
        list: Relation[];
        currentPage: number;
        perPage: number;
    }>;
    findOneAsync(accountId: string, id: string): Promise<Relation | null>;
    addAsync(accountId: string, createRelationDTO: CreateRelationDTO): Promise<Relation>;
    updateAsync(accountId: string, id: string, update: UpdateRelationDTO): Promise<Relation>;
    removeAsync(accountId: string, id: string): Promise<string>;
    restoreAsync(accountId: string, id: string): Promise<string>;
}
