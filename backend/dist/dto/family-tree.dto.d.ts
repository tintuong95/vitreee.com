import { FAMILY_TREE_STATUS } from 'src/types/family-tree.type';
export declare class CreateFamilyTreeDTO {
    name: string;
    address: string;
    description: string;
}
export declare class UpdateFamilyTreeDTO {
    name?: string;
    address?: string;
    description?: string;
    status?: FAMILY_TREE_STATUS;
}
