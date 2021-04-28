import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoutSuccessPageRoutingModule } from './logout-success-routing.module';

import { LogoutSuccessPage } from './logout-success.page';
import {SharedComponentsModule} from "@homecare/shared";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogoutSuccessPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [LogoutSuccessPage]
})
export class LogoutSuccessPageModule {}
