import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerNameComponent} from './customer-name/customer-name.component';
import {CustomerAddressComponent} from './customer-address/customer-address.component';
import {CustomerPlanListComponent} from './customer-plan/customer-plan-list/customer-plan-list.component';
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [
    CustomerNameComponent,
    CustomerAddressComponent,
    CustomerPlanListComponent
  ],
    imports: [
        CommonModule,
        IonicModule
    ],
  exports: [
    CustomerNameComponent,
    CustomerAddressComponent,
    CustomerPlanListComponent
  ]
})
export class CustomerComponentsModule { }
