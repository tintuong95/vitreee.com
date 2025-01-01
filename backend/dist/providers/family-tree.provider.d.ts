import { Request } from 'express';
import { CreateFamilyTreeDTO, UpdateFamilyTreeDTO } from 'src/dto/family-tree.dto';
import { FamilyTree } from 'src/entities/family-tree';
import { Repository } from 'typeorm';
export declare class FamilyTreeProvider {
    private familyTreesRepository;
    constructor(familyTreesRepository: Repository<FamilyTree>);
    findAllAsync(accountId: number, request: Request): Promise<any>;
    findOneAsync(accountId: number, id: number): Promise<FamilyTree | null>;
    addAsync(accountId: number, createFamilyTreeDTO: CreateFamilyTreeDTO): Promise<FamilyTree>;
    updateAsync(accountId: number, id: number, update: UpdateFamilyTreeDTO): Promise<FamilyTree>;
    removeAsync(accountId: number, id: number): Promise<string>;
    restoreAsync(accountId: number, id: number): Promise<string>;
}
