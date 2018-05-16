import { Component, OnInit } from '@angular/core';
import { User } from '../../../../model/user.model';
import { AuthService } from '../../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public authService:AuthService , 
              public flashMessageService:FlashMessagesService,
              public router:Router
            ) { }

  newUser:User = {
    name:"",
    role:"",
    role_id:0,
    picture_url:""
  };

  userpass:string;
  useremail:string;

  onSubmit(){
    this.authService.registerUser(this.newUser ,  this.useremail , this.userpass)
    .then((res) => {
      this.flashMessageService.show("New user "+this.newUser.name+" registered. You must log in" , {cssClass: 'custom-success-alert' , timeOut:10000});
      this.authService.logout(false);
    })
    .catch((err) => {
      this.flashMessageService.show(err.message , {cssClass: 'alert-danger', timeout:4000});
      this.router.navigate(['/dashboard/register']);
    });
  }

  ngOnInit() {

  }

}
