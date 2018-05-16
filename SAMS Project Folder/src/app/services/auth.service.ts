import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase  , AngularFireList , AngularFireObject } from 'angularfire2/database';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { resolve } from 'url';

@Injectable()
export class AuthService {
  
  currentUser:AngularFireObject<User>;
  currentUsers:AngularFireList<User>;

  constructor(public afAuth: AngularFireAuth , 
              public router:Router,
              public flashMessageService: FlashMessagesService,
              public af: AngularFireDatabase
            ) {  
                //  this.currentUsers.snapshotChanges().map(changes => {
                //   return changes.map(c => ({ id: c.payload.key , ...c.payload.val()
                //   }));
                // }).subscribe(val => {
                //   console.log(val);
                // });
             }

  login(email: string , password: string){
    return new Promise((resolve , reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then(result => {
        resolve(result)
      }, err=> reject(err));
    });
  }

  logout(showDefaultMessage:boolean = true){
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
    if(showDefaultMessage)
      this.flashMessageService.show("You Are Logged Out" , {cssClass: "custom-success-alert" , timeout:4000});
  }

  registerUser(data:User , useremail:string , password:string){
    this.currentUsers = this.af.list('/users') as AngularFireList<User>;

    return new Promise((resolve , reject) => {
      this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(useremail , password)
      .then(userData =>{
        resolve(userData);
        this.currentUsers.set(userData.user.uid  , data)       
      }  , err => reject(err) );
    })
  }

  getCurrentUserDetail(){
    this.currentUser = this.af.object('/users/'+ this.afAuth.auth.currentUser.uid) as AngularFireObject<User>;
    return this.currentUser.snapshotChanges().map(c => ({
      id: c.payload.key , ...c.payload.val()
    }));
  }
 
  listUsers(){
    this.currentUsers = this.af.list('/users') as AngularFireList<User>;
    return this.currentUser.snapshotChanges().map(c => ({
      id: c.payload.key , ...c.payload.val()
    })); 
  }
}
