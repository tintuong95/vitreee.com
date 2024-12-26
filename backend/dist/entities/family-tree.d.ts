import { FAMILY_TREE_STATUS } from 'src/types/family-tree.type';
import { Account } from './account';
import { RE_ACCOUNT, RE_MEMBER } from 'src/contants';
import { Member } from './member';
export declare class FamilyTree {
    id: string;
    name: string;
    accountId: string;
    address: string;
    description: string;
    status: FAMILY_TREE_STATUS;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    [RE_ACCOUNT]: Account;
    [RE_MEMBER]: Member[];
}
