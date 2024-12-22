import { Request, Response } from 'express';
import { AccountDetailDTO } from 'src/auth/account.decorator';
import { CreateFamilyTreeDTO, UpdateFamilyTreeDTO } from 'src/dto/family-tree.dto';
import { FamilyTreeProvider } from 'src/providers/family-tree.provider';
export declare class FamilyTreeController {
    private _familyTreeProvider;
    constructor(_familyTreeProvider: FamilyTreeProvider);
    findAll(request: Request, response: Response): Promise<any>;
    findOne(id: string): Promise<any>;
    createAsync(create: CreateFamilyTreeDTO, _account: AccountDetailDTO): Promise<any>;
    updateAsync(update: UpdateFamilyTreeDTO, id: string): Promise<any>;
    removeAsync(id: number): Promise<any>;
    restoreAsync(id: number): Promise<any>;
}
