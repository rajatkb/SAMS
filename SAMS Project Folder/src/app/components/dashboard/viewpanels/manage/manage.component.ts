import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  hideSales:boolean = true;
  hideOrders:boolean = false;

  constructor() { }

  ngOnInit() { }

  onTabSelect(tab:number) {
  	if (tab == 1) {
  		this.hideSales = this.hideSales === true ? false : false;
  		this.hideOrders = this.hideOrders === true ? true : true;
  	}else if (tab == 2) {
  		this.hideOrders = this.hideOrders === true ? false : false;
  		this.hideSales = this.hideSales === true ? true : true;
  	}
  }

}
