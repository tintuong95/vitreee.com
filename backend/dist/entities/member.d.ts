import { RE_ACCOUNT, RE_FAMILY_TREE } from 'src/contants';
import { GENDER_TYPE } from 'src/types/index.type';
import { Account } from './account';
import { FamilyTree } from './family-tree';
import { Relation } from './relation';
export declare class Member {
    id: number;
    accountId: number;
    familyTreeId: number;
    fullName: string;
    phone: string;
    email: string;
    address: string;
    avatar: string;
    description: string;
    birth_date: string;
    dead_date: string;
    gender: GENDER_TYPE;
    type: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    [RE_ACCOUNT]: Account;
    [RE_FAMILY_TREE]: FamilyTree;
    relation_first: Relation;
    relation_second: Relation;
}
