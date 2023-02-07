import { Item } from "./item.model";

export interface Transfer {
    id: number;
    number: number;
    brand: string;
    items: Item[];
    barcode: string;
    date: Date;
    supplier_id: number;
}

