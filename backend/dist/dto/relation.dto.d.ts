export declare class CreateRelationDTO {
    type: number;
    member_first_id: number;
    member_second_id: number;
    status: number;
}
declare const UpdateRelationDTO_base: import("@nestjs/common").Type<Partial<CreateRelationDTO>>;
export declare class UpdateRelationDTO extends UpdateRelationDTO_base {
}
export {};
