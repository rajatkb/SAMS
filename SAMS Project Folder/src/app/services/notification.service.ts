import { Injectable } from '@angular/core';
import { AngularFireDatabase  , AngularFireList , AngularFireObject } from 'angularfire2/database';
import { Notification } from '../model/notification.model';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotificationService {

	productNotification:AngularFireList<Notification>;
  	transactionNotification:AngularFireList<Notification>;
  	customNotification:AngularFireList<Notification>;


  constructor(
  				public af: AngularFireDatabase, 
  				public authService:AuthService
  	) { 

  	this.productNotification = this.af.list('/notification') as AngularFireList<Notification>;
  	this.transactionNotification = this.af.list('/notification') as AngularFireList<Notification>;
  	this.customNotification = this.af.list('/notification') as AngularFireList<Notification>;
  }

  pushProductNotification(_message:string , _data:any , callback){
  	this.authService.getCurrentUserDetail().map(val => {
  		
  		let new_data:Notification={
  			data:_data,
  			message:_message,
  			user:val.name,
  			type:1
  		};

  		return new_data;
  	}).subscribe((val:Notification) => {
  		this.productNotification.set('product',val);
  	  typeof callback === 'function' && callback();
    })
  }

  pushTransactionNotification(_message:string , _data:any , callback){
  	this.authService.getCurrentUserDetail().map(val => {
  		
  		let new_data:Notification={
  			data:_data,
  			message:_message,
  			user:val.name,
  			type:2
  		};

  		return new_data;
  	}).subscribe((val:Notification) => {
  		this.productNotification.set('transaction',val);
  	  typeof callback === 'function' && callback();
    })
  }
  
  getProductNotification(){
  	return (this.af.object('/notification/product') as AngularFireObject<Notification>).snapshotChanges().map(c => ({
      id: c.payload.key , ...c.payload.val()
    }));
  }

  getTransactionNotification(){
  	return (this.af.object('/notification/transaction') as AngularFireObject<Notification>).snapshotChanges().map(c => ({
      id: c.payload.key , ...c.payload.val()
    }));
  }

}
