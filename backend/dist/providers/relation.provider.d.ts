import { Request } from 'express';
import { CreateRelationDTO, UpdateRelationDTO } from 'src/dto/relation.dto';
import { Relation } from 'src/entities/relation';
import { Repository } from 'typeorm';
export declare class RelationProvider {
    private relationRepository;
    constructor(relationRepository: Repository<Relation>);
    findAllAsync(accountId: number, request: Request): Promise<{
        count: number;
        list: Relation[];
        currentPage: number;
        perPage: number;
    }>;
    findOneAsync(accountId: number, id: number): Promise<Relation | null>;
    addAsync(accountId: number, createRelationDTO: CreateRelationDTO): Promise<Relation>;
    updateAsync(accountId: number, id: number, update: UpdateRelationDTO): Promise<Relation>;
    removeAsync(accountId: number, id: number): Promise<string>;
    restoreAsync(accountId: number, id: number): Promise<string>;
}
