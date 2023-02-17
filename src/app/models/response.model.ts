import { Supplier } from "./supplier.model";
import { Transfer } from "./transfer.model";

export interface Response {
    status: string,
    message: string,
    data: any,
}