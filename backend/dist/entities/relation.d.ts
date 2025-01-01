import { RE_ACCOUNT } from 'src/contants';
import { RELATION_MEMBER_TYPE } from 'src/types/relation.type';
import { Account } from './account';
export declare class Relation {
    id: number;
    accountId: number;
    familyTreeId: number;
    type: RELATION_MEMBER_TYPE;
    member_first_id: number;
    member_second_id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    [RE_ACCOUNT]: Account;
}
