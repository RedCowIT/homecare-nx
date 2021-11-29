import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNameComponent } from './user-name/user-name.component';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [
    UserNameComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserNameComponent,
    LogoutComponent
  ]
})
export class AuthComponentsModule { }
