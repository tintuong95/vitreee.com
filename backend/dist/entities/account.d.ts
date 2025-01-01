import { RE_FAMILY_TREE, RE_MEMBER, RE_RELATION } from 'src/contants';
import { ACCOUNT_STATUS } from 'src/types/account.type';
import { GENDER_TYPE } from 'src/types/index.type';
import { FamilyTree } from './family-tree';
import { Member } from './member';
import { Relation } from './relation';
export declare class Account {
    id: number;
    email: string;
    password: string;
    fullName: string;
    phone: string;
    photo: string;
    dateOfBirth: string;
    gender: GENDER_TYPE;
    status: ACCOUNT_STATUS;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    hash(): void;
    isTruePassword(password: string): boolean;
    [RE_MEMBER]: Member[];
    [RE_FAMILY_TREE]: FamilyTree[];
    [RE_RELATION]: Relation[];
}
