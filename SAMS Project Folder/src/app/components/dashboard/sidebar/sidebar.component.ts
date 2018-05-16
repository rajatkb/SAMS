import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  manageClicked:boolean =false;
  salesClicked:boolean = false;
  billingClicked:boolean = false;
  registerClicked:boolean = false;
  productClicked:boolean = false;
  currentUser:User = undefined ;

  constructor(public authService:AuthService,
              public router:Router  
  ) { }

  ngOnInit() {

    this.tabClicked('sales');
    this.authService.getCurrentUserDetail().subscribe(user =>{
      this.currentUser = user;
    });
  }

  logOut(){
    this.authService.logout();
  }

  tabClicked(url:string){
    this.router.navigate(['/dashboard/'+url]);
    this.manageClicked =false;
    this.salesClicked = false;
    this.billingClicked = false;
    this.registerClicked = false;
    this.productClicked = false;
    switch(url){
      case "products" : this.productClicked = true;  break;
      case "manage"   : this.manageClicked = true; break;
      case "sales"    : this.salesClicked = true; break;
      case "billing"  : this.billingClicked = true; break;
      case "register" : this.registerClicked = true; break;
      default: this.salesClicked = true;
    }
  }

}
