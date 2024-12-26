import { Request, Response } from 'express';
import { AccountDetailDTO } from 'src/auth/account.decorator';
import { CreateFamilyTreeDTO, UpdateFamilyTreeDTO } from 'src/dto/family-tree.dto';
import { FamilyTreeProvider } from 'src/providers/family-tree.provider';
export declare class FamilyTreeController {
    private _familyTreeProvider;
    constructor(_familyTreeProvider: FamilyTreeProvider);
    findAll(request: Request, response: Response, _account: AccountDetailDTO): Promise<any>;
    findOne(id: string, response: Response, _account: AccountDetailDTO): Promise<any>;
    createAsync(create: CreateFamilyTreeDTO, response: Response, _account: AccountDetailDTO): Promise<any>;
    updateAsync(update: UpdateFamilyTreeDTO, id: string, response: Response, _account: AccountDetailDTO): Promise<any>;
    removeAsync(id: string, response: Response, _account: AccountDetailDTO): Promise<any>;
    restoreAsync(id: string, response: Response, _account: AccountDetailDTO): Promise<any>;
}
