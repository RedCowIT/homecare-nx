import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerNameComponent} from './customer-name/customer-name.component';
import {CustomerAddressComponent} from './customer-address/customer-address.component';
import {CustomerPlanListComponent} from './customer-plan/customer-plan-list/customer-plan-list.component';
import {IonicModule} from "@ionic/angular";
import {CommonComponentsModule} from "../../../../common/src/lib/components/common-components.module";
import { AddCustomerApplianceComponent } from './add-customer-appliance/add-customer-appliance.component';
import {SharedComponentsModule} from "@homecare/shared";
import { CustomerApplianceModalComponent } from './appliance/customer-appliance-modal/customer-appliance-modal.component';
import { CustomerApplianceFormComponent } from './appliance/customer-appliance-form/customer-appliance-form.component';
import {CustomerApplianceTableComponent} from "./appliance/customer-appliance-table/customer-appliance-table.component";
import {IonicCommonComponentsModule} from "@homecare/ionic-common";
import {ReactiveFormsModule} from "@angular/forms";
import { CustomerContactFormComponent } from './customer-contact-form/customer-contact-form.component';


@NgModule({
  declarations: [
    CustomerNameComponent,
    CustomerAddressComponent,
    CustomerPlanListComponent,
    CustomerApplianceTableComponent,
    AddCustomerApplianceComponent,
    CustomerApplianceModalComponent,
    CustomerApplianceFormComponent,
    CustomerContactFormComponent
  ],
    imports: [
        CommonModule,
        IonicModule,
        CommonComponentsModule,
        IonicCommonComponentsModule,
        SharedComponentsModule,
        ReactiveFormsModule
    ],
  exports: [
    CustomerNameComponent,
    CustomerAddressComponent,
    CustomerPlanListComponent,
    CustomerApplianceTableComponent,
    AddCustomerApplianceComponent,
    CustomerContactFormComponent
  ]
})
export class CustomerComponentsModule { }
