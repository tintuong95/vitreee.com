import { GENDER_TYPE } from 'src/types/index.type';
import { Account } from './account';
import { RE_ACCOUNT, RE_FAMILY_TREE } from 'src/contants';
import { FamilyTree } from './family-tree';
import { Relation } from './relation';
export declare class Member {
    id: string;
    accountId: string;
    familyTreeId: string;
    fullName: string;
    phone: string;
    email: string;
    address: string;
    avatar: string;
    description: string;
    birth_date: string;
    dead_date: string;
    gender: GENDER_TYPE;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    [RE_ACCOUNT]: Account;
    [RE_FAMILY_TREE]: FamilyTree;
    relation_first: Relation;
    relation_second: Relation;
}
