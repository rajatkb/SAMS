export interface Notification{
	message:string,
	user:string,
	data:any,
	type:number // 1. product 2. transaction 3.custome
}