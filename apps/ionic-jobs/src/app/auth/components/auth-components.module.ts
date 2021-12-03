import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNameComponent } from './user-name/user-name.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [
    UserNameComponent,
    LogoutButtonComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    UserNameComponent,
    LogoutButtonComponent
  ]
})
export class AuthComponentsModule { }
