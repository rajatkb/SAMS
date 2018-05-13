import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  
})
export class NotificationComponent implements OnInit {
  
  
  doc_classes_colors = [
    "#7B1FA2",
    "#33691E",
    "#0277BD",
    "#E91E63"
];
getRandomColor = function () {
  let bgColor = this.doc_classes_colors[Math.floor(Math.random() *this.doc_classes_colors.length)];
  return this._sanitizer.bypassSecurityTrustStyle(bgColor);
};

notifications_list=["notification from orders","notification from orders", "notification from orders"];
messageList: any[] = [
  {
    "mes": "a new order is placed"
  }
  
];

insert_into_notification_list(data){
  this.notifications_list.push(data);
}
insert_into_message_list(data){
  if(this.messageList.length<5)
  {
    this.messageList.push(data);
  }
  else{
    this.messageList.splice(0,1);
    this.messageList.push(data);
  }
}


  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    
        
    }
    

}
