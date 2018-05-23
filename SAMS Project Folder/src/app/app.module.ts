import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NguCarouselModule } from '@ngu/carousel';

// Angular firebase imports
import { AngularFireModule}  from 'angularfire2';
import { AngularFireDatabaseModule , AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule , AngularFireAuth } from 'angularfire2/auth';


export const  firebaseConfig = {
  apiKey: "AIzaSyDCIrjE1bLRQU3wVM2oyYONN_gyl-7UHPE",
  authDomain: "sams-1727b.firebaseapp.com",
  databaseURL: "https://sams-1727b.firebaseio.com",
  projectId: "sams-1727b",
  storageBucket: "sams-1727b.appspot.com",
  messagingSenderId: "555305360767"
};



import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { ViewpanelsComponent } from './components/dashboard/viewpanels/viewpanels.component';
import { SalesComponent } from './components/dashboard/viewpanels/sales/sales.component';
import { ManageComponent } from './components/dashboard/viewpanels/manage/manage.component';
import { BillingComponent } from './components/dashboard/viewpanels/billing/billing.component';
import { NotificationPanelComponent } from './components/dashboard/notification-panel/notification-panel.component';
import { RegisterComponent } from './components/dashboard/viewpanels/register/register.component';
import { ProductComponent } from './components/dashboard/viewpanels/product/product.component';
import { ProductDetailsComponent } from './components/dashboard/viewpanels/product-details/product-details.component';
import { PlaceOrderComponent } from './components/dashboard/viewpanels/manage/place-order/place-order.component';
import { PlaceDeliveryComponent } from './components/dashboard/viewpanels/manage/place-delivery/place-delivery.component';


// services import 
import { AuthService } from '../app/services/auth.service';
import { ProductService } from '../app/services/product.service';
import { BillingService } from '../app/services/billing.service';
import { GlobalVariableService } from '../app/services/global-variable.service';
import { OutletService } from '../app/services/outlet.service';
import { NotificationService } from '../app/services/notification.service';
// guards
import { AuthGuard } from '../app/guard/auth.guard';
import { AccessGuard } from '../app/guard/access.guard';





const appRoutes: Routes = [
  {path:'',component: LoginComponent},
  {path:'login',component: LoginComponent},
  { path:'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AccessGuard],
        children:[
          {path:'billing',component:BillingComponent, pathMatch:'full',},
          {path:'register',component:RegisterComponent, pathMatch:'full',}
        ]
      },
      {
        path: '',
        children: [
          {path:'sales',component:SalesComponent, pathMatch:'full',},
          {path:'manage',component:ManageComponent, pathMatch:'full',},
          {path:'products',component:ProductComponent, pathMatch:'full',},
          {path:'products/:id',component:ProductDetailsComponent, pathMatch:'full'}
        ]        
      }
    ]
  },
  
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    ViewpanelsComponent,
    SalesComponent,
    ManageComponent,
    BillingComponent,
    NotificationPanelComponent,
    RegisterComponent,
    ProductComponent,
    ProductDetailsComponent,
    PlaceOrderComponent,
    PlaceDeliveryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    NguCarouselModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    AuthService,
    AuthGuard,
    AccessGuard,
    ProductService,
    BillingService,
    GlobalVariableService,
    OutletService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
