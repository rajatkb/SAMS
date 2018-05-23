import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit {

  constructor(	private _sanitizer: DomSanitizer,
  				private nf:NotificationService
  	) { }

  ngOnInit() {
  	this.nf.getProductNotification().subscribe(val => {
  		if(val.message !== undefined){
  			val.color = this.getRandomColor();
  			this.insertIntoMessageList(val);
  		}
  	});

  	this.nf.getTransactionNotification().subscribe(val => {
  		if(val.message !== undefined){
  			val.color = this.getRandomColor();
  			this.insertIntoMessageList(val);
  		}
  	});
  
  }

    doc_classes_colors:string[]= [
	    "#0d47a1",
	    "#00695c",
	    // "#00c853",
	    // "#6200ea"
	];


	getRandomColor = function () {
	  let bgColor = this.doc_classes_colors[Math.floor(Math.random() *this.doc_classes_colors.length)];
	  return this._sanitizer.bypassSecurityTrustStyle(bgColor);
	};

	messageList: any[] = [];

	insertIntoMessageList(data){
	  if(this.messageList.length<5)
	  {
	    this.messageList.push(data);
	  }
	  else{
	    this.messageList.splice(0,1);
	    this.messageList.push(data);
	  }
	}



}
