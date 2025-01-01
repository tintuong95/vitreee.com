import { RELATION_MEMBER_TYPE } from 'src/types/relation.type';
export declare class CreateRelationDTO {
    type?: RELATION_MEMBER_TYPE;
    member_first_id: number;
    member_second_id: number;
    familyTreeId: number;
}
declare const UpdateRelationDTO_base: import("@nestjs/common").Type<Partial<CreateRelationDTO>>;
export declare class UpdateRelationDTO extends UpdateRelationDTO_base {
}
export {};
