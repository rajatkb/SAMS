import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

	period:string = (new Date()).toLocaleString("en-us", { month: "long" }) + ", " + (new Date()).getFullYear();
	
  	ProductvsProfit =  {
	  chartType: 'PieChart',
	  dataTable: [
	    ['Product', 'Profit'],
	    ['Maggie', 151],
	    ['Lays', 232],
	    ['Parachute Oil', 522],
	    ['Lifebuoy', 322],
	    ['Kissan Sauce', 777]
	  ],
	  options: {
	  	'title': 'Product - Profit', 
	  	'height': 400, 
	  	//'is3D': true,
	  	'pieHole': 0.4, 
	  	'chartArea': {'width':'90%', 'height':'80%'}, 
	  	'fontName': 'Quicksand',
	  	'legend': {'position': 'bottom'},
	  	'animation': {'duration': 800, 'easing': 'in', 'startup': true}
	  }
	};

	ProfitvsTime =  {
	  chartType: 'AreaChart',
	  dataTable: [
	    ['Month', 'Maggie', 'Kissan Sauce', 'Lays', 'Lifebuoy'],
	    ['Jan', 51,  37.8, 80.8, 41.8],
        ['Feb', 82,  80.9, 69.5, 32.4],
        ['Mar', 53,  25.4,   57, 25.7],
        ['Apr', 74,  11.7, 38.8, 10.5],
        ['May', 25,  11.9, 17.6, 10.4],
        ['Jun', 76,   8.8, 53.6,  7.7],
	  ],
	  options: {
	  	'title': 'Profit - Time', 
	  	'height': 500,
	  	'chartArea': {'width':'90%', 'height':'70%'}, 
	  	'fontName': 'Quicksand',
	  	'legend': {'position': 'top'},
	  	'hAxis': {'title': 'Months'},
		'vAxis': {'title': 'Profit'},
		'animation': {'duration': 800, 'easing': 'in', 'startup': true}
	  }
	};

	ProductvsSales =  {
	  chartType: 'ColumnChart',
	  dataTable: [
	    ['Product', 'Sales'],
	    ['Maggie',     151],
	    ['Lays',      232],
	    ['Parachute Oil',  522],
	    ['Lifebuoy', 322],
	    ['Kissan Sauce',    777]
	  ],
	  options: {
	  	'title': 'Product - Sales', 
	  	'height': 500,
	  	'chartArea': {'width':'85%', 'height':'70%'}, 
	  	'fontName': 'Quicksand',
	  	'legend': {'position': 'none'},
	  	'hAxis': {'title': 'Products'},
		'vAxis': {'title': 'Sales'},
		'animation': {'duration': 800, 'easing': 'in', 'startup': true}
	  }
	};

 	constructor() {

  	}

  	ngOnInit() {

  	}

}
