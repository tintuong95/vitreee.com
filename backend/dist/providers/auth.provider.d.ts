import { AccountProvider } from './account.provider';
export declare class AuthProvider {
    private _accountProvider;
    constructor(_accountProvider: AccountProvider);
    signInAsync(email: string, password: string): Promise<any>;
}
