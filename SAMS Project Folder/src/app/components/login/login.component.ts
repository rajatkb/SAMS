import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username:string = "";
	password:string = "";

  constructor(public router:Router,
		public authService:AuthService,
		public flashMessagesService:FlashMessagesService
	) { }

  ngOnInit() {
    var month_dict = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
	  var superscript_dict = ["th", "st", "nd", "rd"];
	  
	  var currDate = document.querySelector('.curr-date');
	  var currTime = document.querySelector('.curr-time');

	  var today = new Date();
	  var dd = today.getDate();
	  var mm = month_dict[today.getMonth()]; 
	  var yyyy = today.getFullYear();
	  var hh = today.getHours();
	  var min = today.getMinutes();

	  var dd_str: string = dd.toString();
	  var hh_str: string = hh.toString();
	  var min_str: string = min.toString();
	  
	  var superscript = 'th';

	  if ((dd % 10) >= 1 && (dd % 10) <= 3)
	    superscript = superscript_dict[dd % 10];

	  if(dd < 10) 
	      dd_str = "0" + dd.toString();

	  if (hh < 10)
	      hh_str = "0" + hh.toString();

	  if (min < 10)
	      min_str = "0" + min.toString();

	  var date = dd_str + '<sup>' + superscript + '</sup> ' + mm + ' ' + yyyy;
	  var time = hh_str + ":" + min_str;

	  currDate.innerHTML = date;
	  currTime.innerHTML = time;
  }

 onSubmit(){
	 this.authService.login(this.username , this.password)
	 .then((res) => {
			this.flashMessagesService.show('You are logged in' , {cssClass: 'custom-success-alert' , timeout:4000});
		 	this.router.navigate(['/dashboard/sales']);
		})
	 .catch((err) => {
			this.flashMessagesService.show(err.message,{cssClass: 'custom-danger-alert' , timeout:4000});
			this.router.navigate(['/']);
	 })
 }	

	
}
