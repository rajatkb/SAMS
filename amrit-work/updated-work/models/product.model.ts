export class Product {
	 public productId: string;
	 public productName: string;
	 public productPrice: number;
	 public productImageUrl: string;
	 public productManufacturer: string;
	 public productDistributors: string;
	 public productWholesalers: string;
	 public productRetailers: string;

	 constructor(id: string, name: string, price: number, url: string, manf: string, distf: string, wsalf: string, retf: string) {
	 	this.productId = id;
	 	this.productName = name;
	 	this.productPrice = price;
	 	this.productImageUrl = url;
	 	this.productManufacturer = manf;
	 	this.productDistributors = distf;
	 	this.productWholesalers = wsalf;
	 	this.productRetailers = retf;
	 }
}