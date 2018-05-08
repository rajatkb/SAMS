export class Order {
	 public productId: string;
	 public productName: string;
	 public productPrice: number;
	 public productQuantity: number;
	 public productImageUrl: string;

	 constructor(id: string, name: string, price: number, quantity: number, url: string) {
	 	this.productId = id;
	 	this.productName = name;
	 	this.productPrice = price;
	 	this.productQuantity = quantity;
	 	this.productImageUrl = url;
	 }
}