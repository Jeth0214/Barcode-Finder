export interface User {
    id?: number;
    name: string;
    password: string;
    role: string;
    created_at?: Date;
    updated_at?: Date;
}