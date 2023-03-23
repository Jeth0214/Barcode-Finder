import { Transfer } from "./transfer.model";

export interface Supplier {
    id: number;
    name: string;
    image: string;
    brand: string;
    transfer?: Transfer[]
}