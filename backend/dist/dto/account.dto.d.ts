import { ACCOUNT_STATUS } from 'src/types/account.type';
import { GENDER_TYPE } from 'src/types/index.type';
export declare class CreateAccountDto {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    photo?: string;
    dateOfBirth: string;
    gender: GENDER_TYPE;
    status: ACCOUNT_STATUS;
}
export declare class UpdateAccountDto {
    email: string;
    fullName?: string;
    phone?: string;
    photo?: string;
    dateOfBirth?: string;
    gender?: GENDER_TYPE;
    status?: ACCOUNT_STATUS;
}
export declare class AccountResponseDto {
    id: number;
    email: string;
    fullName: string;
    phone: string;
    photo: string;
    dateOfBirth: string;
    gender: GENDER_TYPE;
    status: ACCOUNT_STATUS;
}
export declare class LoginDto {
    email: string;
    password: string;
}
