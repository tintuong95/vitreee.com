import { GENDER_TYPE } from 'src/types/index.type';
export declare class CreateMemberDTO {
    familyTreeId: string;
    fullName: string;
    phone: string;
    email: string;
    address: string;
    avatar: string;
    description: string;
    birth_date: string;
    dead_date: string;
    gender?: GENDER_TYPE;
}
declare const UpdateMemberDTO_base: import("@nestjs/common").Type<Partial<CreateMemberDTO>>;
export declare class UpdateMemberDTO extends UpdateMemberDTO_base {
}
export {};
