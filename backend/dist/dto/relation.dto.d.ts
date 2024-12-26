import { RELATION_MEMBER_TYPE } from 'src/types/relation.type';
export declare class CreateRelationDTO {
    type?: RELATION_MEMBER_TYPE;
    member_first_id: string;
    member_second_id: string;
}
declare const UpdateRelationDTO_base: import("@nestjs/common").Type<Partial<CreateRelationDTO>>;
export declare class UpdateRelationDTO extends UpdateRelationDTO_base {
}
export {};
