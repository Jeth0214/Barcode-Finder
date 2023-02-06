import { Item } from "./item.model";

export interface Invoice {
    id: number;
    number: number;
    brand: string;
    items: Item[];
    barcode: string;
}

