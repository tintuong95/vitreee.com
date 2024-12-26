import { CreateFamilyTreeDTO, UpdateFamilyTreeDTO } from 'src/dto/family-tree.dto';
import { FamilyTree } from 'src/entities/family-tree';
import { Repository } from 'typeorm';
import { Request } from 'express';
export declare class FamilyTreeProvider {
    private familyTreesRepository;
    constructor(familyTreesRepository: Repository<FamilyTree>);
    findAllAsync(accountId: string, request: Request): Promise<{
        count: number;
        list: FamilyTree[];
        currentPage: number;
        perPage: number;
    }>;
    findOneAsync(accountId: string, id: string): Promise<FamilyTree | null>;
    addAsync(accountId: string, createFamilyTreeDTO: CreateFamilyTreeDTO): Promise<FamilyTree>;
    updateAsync(accountId: string, id: string, update: UpdateFamilyTreeDTO): Promise<FamilyTree>;
    removeAsync(accountId: string, id: string): Promise<string>;
    restoreAsync(accountId: string, id: string): Promise<string>;
}
