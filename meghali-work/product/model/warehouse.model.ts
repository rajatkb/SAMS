export interface Warehouse{
    id:string;
    product_id:string;
    batch_id:string;
    barcode:string;
    sent_to_outlet:boolean;
    arrival_date:Date;
}