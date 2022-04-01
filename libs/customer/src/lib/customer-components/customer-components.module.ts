import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerNameComponent} from './customer-name/customer-name.component';
import {CustomerAddressComponent} from './customer-address/customer-address.component';
import {CustomerPlanListComponent} from './customer-plan/customer-plan-list/customer-plan-list.component';
import {IonicModule} from "@ionic/angular";
import {CommonComponentsModule} from "../../../../common/src/lib/components/common-components.module";
import {AddCustomerApplianceComponent} from './add-customer-appliance/add-customer-appliance.component';
import {SharedComponentsModule} from "@homecare/shared";
import {CustomerApplianceModalComponent} from './appliance/customer-appliance-modal/customer-appliance-modal.component';
import {CustomerApplianceFormComponent} from './appliance/customer-appliance-form/customer-appliance-form.component';
import {CustomerApplianceTableComponent} from "./appliance/customer-appliance-table/customer-appliance-table.component";
import {IonicCommonComponentsModule, SignaturePadModule} from "@homecare/ionic-common";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerContactFormComponent} from './customer-contact-form/customer-contact-form.component';
import {PlanComponentsModule} from "../../../../plan/src/lib/plan-components/plan-components.module";
import {ProductComponentsModule} from "../../../../product/src/lib/product-components/product-components.module";
import {ApplianceFormComponent} from "./appliance/appliance-form/appliance-form.component";
import { CustomerPlanFinanceDocumentListComponent } from './customer-plan/customer-plan-finance-document-list/customer-plan-finance-document-list.component';
import { CustomerPlanFinanceDocumentFormComponent } from './customer-plan/customer-plan-finance-document-form/customer-plan-finance-document-form.component';
import { CustomerPlanFinanceDocumentModalComponent } from './customer-plan/customer-plan-finance-document-modal/customer-plan-finance-document-modal.component';
import { CustomerPlanFinanceDocumentListItemComponent } from './customer-plan/customer-plan-finance-document-list-item/customer-plan-finance-document-list-item.component';
import { EmailCustomerPlanFinanceDocumentFormComponent } from './customer-plan/email-customer-plan-finance-document-form/email-customer-plan-finance-document-form.component';
import { EmailCustomerPlanFinanceDocumentModalComponent } from './customer-plan/email-customer-plan-finance-document-modal/email-customer-plan-finance-document-modal.component';
import { DirectDebitDetailsFormComponent } from './direct-debit-details-form/direct-debit-details-form.component';


@NgModule({
  declarations: [
    ApplianceFormComponent,
    CustomerNameComponent,
    CustomerAddressComponent,
    CustomerPlanListComponent,
    CustomerApplianceTableComponent,
    AddCustomerApplianceComponent,
    CustomerApplianceModalComponent,
    CustomerApplianceFormComponent,
    CustomerContactFormComponent,
    CustomerPlanFinanceDocumentListComponent,
    CustomerPlanFinanceDocumentFormComponent,
    CustomerPlanFinanceDocumentModalComponent,
    CustomerPlanFinanceDocumentListItemComponent,
    EmailCustomerPlanFinanceDocumentFormComponent,
    EmailCustomerPlanFinanceDocumentModalComponent,
    DirectDebitDetailsFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    CommonComponentsModule,
    IonicCommonComponentsModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    PlanComponentsModule,
    ProductComponentsModule,
    SignaturePadModule
  ],
  exports: [
    ApplianceFormComponent,
    CustomerNameComponent,
    CustomerAddressComponent,
    CustomerPlanListComponent,
    CustomerApplianceTableComponent,
    AddCustomerApplianceComponent,
    CustomerContactFormComponent,
    CustomerPlanFinanceDocumentListComponent,
    CustomerPlanFinanceDocumentModalComponent,
    CustomerPlanFinanceDocumentFormComponent
  ]
})
export class CustomerComponentsModule {
}
