import { RELATION_MEMBER_TYPE } from 'src/types/relation.type';
import { Account } from './account';
import { RE_ACCOUNT } from 'src/contants';
export declare class Relation {
    id: string;
    accountId: string;
    type: RELATION_MEMBER_TYPE;
    member_first_id: string;
    member_second_id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    [RE_ACCOUNT]: Account;
}
