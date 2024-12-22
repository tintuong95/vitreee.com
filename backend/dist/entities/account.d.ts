export declare class Account {
    id: string;
    email: string;
    password: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    hash(): void;
    isTruePassword(password: string): boolean;
}
