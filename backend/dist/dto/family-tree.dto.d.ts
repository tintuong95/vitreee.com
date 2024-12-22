export declare class CreateFamilyTreeDTO {
    name: string;
    address: string;
    imageUrlCover: string;
    description: string;
    status: number;
    member: number;
}
declare const UpdateFamilyTreeDTO_base: import("@nestjs/common").Type<Partial<CreateFamilyTreeDTO>>;
export declare class UpdateFamilyTreeDTO extends UpdateFamilyTreeDTO_base {
}
export {};
