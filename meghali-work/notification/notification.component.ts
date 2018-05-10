import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  
})
export class NotificationComponent implements OnInit {
  
  doc_classes_colors = [
    "#339E42",
    "#039BE5",
    "#EF6C00",
    "#A1887F",
    "#607D8B",
    "#039BE5",
    "#009688",
    "#536DFE",
    "#AB47BC",
    "#E53935",
    "#3F51B5"
];
getRandomColor = function () {
  let bgColor = this.doc_classes_colors[Math.floor(Math.random() *this.doc_classes_colors.length)];
  return bgColor;
};

notifications_list=["notification from orders","notification from orders", "notification from orders"];
messageList: any[] = [
  {
    "mes": "Douglas  Pace"
  },
  {
    "mes": "Mcleod  Mueller"
  },
  
  
];
isVisible=true;
insert_into_notification_list(data){
  this.notifications_list.push(data);
}
insert_into_message_list(data){
  if(this.messageList.length<3)
  {
    this.messageList.push(data);
  }
  else{
    this.messageList.splice(0,1);
    this.messageList.push(data);
  }
}

  constructor() { }

  ngOnInit() {
    
        
    }
    

}
