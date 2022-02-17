import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNameComponent } from './user-name/user-name.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import {IonicModule} from "@ionic/angular";
import { LoginFormComponent } from './login-form/login-form.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UserNameComponent,
    LogoutButtonComponent,
    LoginFormComponent,
  ],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule
    ],
  exports: [
    UserNameComponent,
    LogoutButtonComponent,
    LoginFormComponent
  ]
})
export class AuthComponentsModule { }
