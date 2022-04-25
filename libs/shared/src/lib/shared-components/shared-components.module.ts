import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AddButtonComponent } from './add-button/add-button.component';
import {IonicModule} from "@ionic/angular";
import { CompanyAddressComponent } from './company-address/company-address.component';
import { CompanyPhoneComponent } from './company-phone/company-phone.component';


@NgModule({
  declarations: [
    AddButtonComponent,
    CompanyAddressComponent,
    CompanyPhoneComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    AddButtonComponent,
    CompanyAddressComponent,
    CompanyPhoneComponent
  ]
})
export class SharedComponentsModule { }
