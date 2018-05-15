export class Product {
	 public id: string;
	 public name: string;
	 public brand_name: string;
	 public category_name: string;
	 public description: string;
	 public price: number;
	 public status: boolean;
	 public picture_url: string;

	 constructor(id: string, name: string, brand: string, category: string, desc: string, price: number, status: boolean, url: string) {
	 	this.id = id;
	 	this.name = name;
	 	this.brand_name = brand;
	 	this.category_name = category;
	 	this.description = desc;
	 	this.price = price;
	 	this.status = status;
	 	this.picture_url = url
	 }
}