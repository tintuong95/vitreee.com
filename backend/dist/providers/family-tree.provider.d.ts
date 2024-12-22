import { CreateFamilyTreeDTO, UpdateFamilyTreeDTO } from 'src/dto/family-tree.dto';
import { FamilyTree } from 'src/entities/family-tree';
import { Repository } from 'typeorm';
import { Request } from 'express';
export declare class FamilyTreeProvider {
    private familyTreesRepository;
    constructor(familyTreesRepository: Repository<FamilyTree>);
    findAllAsync(request: Request): Promise<{
        count: number;
        list: FamilyTree[];
    }>;
    findOneAsync(id: string): Promise<FamilyTree | null>;
    addAsync(accountId: string, createFamilyTreeDTO: CreateFamilyTreeDTO): Promise<FamilyTree>;
    updateAsync(id: string, update: UpdateFamilyTreeDTO): Promise<FamilyTree>;
    removeAsync(id: number): Promise<import("typeorm").UpdateResult>;
    restoreAsync(id: number): Promise<import("typeorm").UpdateResult>;
}
