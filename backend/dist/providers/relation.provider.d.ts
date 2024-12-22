import { Relation } from 'src/entities/relation';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateRelationDTO, UpdateRelationDTO } from 'src/dto/relation.dto';
export declare class RelationProvider {
    private relationRepository;
    constructor(relationRepository: Repository<Relation>);
    findAllAsync(request: Request): Promise<{
        count: number;
        data: Relation[];
    }>;
    findOneAsync(id: string): Promise<Relation | null>;
    addAsync(createRelationDTO: CreateRelationDTO): Promise<Relation>;
    updateAsync(id: string, update: UpdateRelationDTO): Promise<Relation>;
    removeAsync(id: number): Promise<import("typeorm").UpdateResult>;
    restoreAsync(id: number): Promise<import("typeorm").UpdateResult>;
}
