export interface Billing{
	transactionId?:string,
	deliveryStatus:boolean,
	category:number,
	date:string,
	time:string,
	totalCost:number,
	items:{[key:string]:number},
}