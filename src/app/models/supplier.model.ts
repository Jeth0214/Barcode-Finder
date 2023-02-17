import { Transfer } from "./transfer.model";

export interface Supplier {
    id: number;
    name: string;
    image: string;
    code: string;
    transfer?: Transfer[]
}