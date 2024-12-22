import { Request } from 'express';
import { CreateRelationDTO, UpdateRelationDTO } from 'src/dto/relation.dto';
import { RelationProvider } from 'src/providers/relation.provider';
export declare class RelationController {
    private _relationProvider;
    constructor(_relationProvider: RelationProvider);
    findAll(request: Request): Promise<any>;
    findOne(id: string): Promise<any>;
    createAsync(create: CreateRelationDTO): Promise<any>;
    updateAsync(update: UpdateRelationDTO, id: string): Promise<any>;
    removeAsync(id: number): Promise<any>;
    restoreAsync(id: number): Promise<any>;
}
