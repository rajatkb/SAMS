import { Component, OnInit } from '@angular/core';
import { NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

	month:string = (new Date()).toLocaleString("en-us", { month: "long" });
	period:string = this.month.slice(0, 3) + " " + (new Date()).getFullYear();
	
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
	  	'height': 270, 
	  	//'is3D': true,
	  	'pieHole': 0.4, 
	  	'chartArea': {'width':'80%', 'height':'65%', 'top': 30}, 
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
	  	'height': 350,
	  	'chartArea': {'width':'80%', 'height':'60%'}, 
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
	  	'height': 350,
	  	'chartArea': {'width':'75%', 'height':'60%'}, 
	  	'fontName': 'Quicksand',
	  	'legend': {'position': 'none'},
	  	'hAxis': {'title': 'Products'},
		'vAxis': {'title': 'Sales'},
		'animation': {'duration': 800, 'easing': 'in', 'startup': true},
		'bar': {'groupWidth': '50%'}
	  }
	};

	public carousel: NguCarousel;

 	constructor() {

  	}

  	ngOnInit() {

  		this.carousel = {
	      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
	      slide: 1,
	      speed: 400,
	      interval: 4000,
	      point: {
	        visible: true
	      },
	      load: 2,
	      touch: true,
	      loop: true,
	      custom: 'banner',
	      animation: 'lazy'
	    }

  	}

}
