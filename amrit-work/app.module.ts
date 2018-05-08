import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { SidePanelComponent } from './dashboard/side-panel/side-panel.component';
import { MainContentComponent } from './dashboard/main-content/main-content.component';
import { PlaceOrderComponent } from './dashboard/main-content/place-order/place-order.component';
import { PlaceDeliveryComponent } from './dashboard/main-content/place-delivery/place-delivery.component';
import { ProductComponent } from './dashboard/main-content/product/product.component';
import { AnalyticsComponent } from './dashboard/main-content/analytics/analytics.component';

const appRoutes: Routes = [
  {path: '', component: PlaceOrderComponent},
  {path: 'place-order', component: PlaceOrderComponent},
  {path: 'place-delivery', component: PlaceDeliveryComponent},
  {path: 'product', component: ProductComponent},
  {path: 'analytics', component: AnalyticsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidePanelComponent,
    MainContentComponent,
    PlaceOrderComponent,
    PlaceDeliveryComponent,
    ProductComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
