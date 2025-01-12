import { Request, Response } from 'express';
import { AccountDetailDTO } from 'src/auth/account.decorator';
import { CreateRelationDTO, UpdateRelationDTO } from 'src/dto/relation.dto';
import { RelationProvider } from 'src/providers/relation.provider';
export declare class RelationController {
    private _relationProvider;
    constructor(_relationProvider: RelationProvider);
    findAll(request: Request, response: Response, _account: AccountDetailDTO): Promise<any>;
    findOne(id: number, response: Response, _account: AccountDetailDTO): Promise<any>;
    createAsync(create: CreateRelationDTO, response: Response, _account: AccountDetailDTO): Promise<any>;
    updateAsync(update: UpdateRelationDTO, id: number, response: Response, _account: AccountDetailDTO): Promise<any>;
    removeAsync(id: number, response: Response, _account: AccountDetailDTO): Promise<any>;
    restoreAsync(id: number, response: Response, _account: AccountDetailDTO): Promise<any>;
}
