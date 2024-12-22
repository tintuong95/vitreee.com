export declare class CreateAccountDTO {
    email: string;
    password: string;
    status: number;
}
declare const UpdateAccountDTO_base: import("@nestjs/common").Type<Partial<CreateAccountDTO>>;
export declare class UpdateAccountDTO extends UpdateAccountDTO_base {
}
export {};
