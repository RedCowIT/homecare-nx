import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponentsModule} from './components/auth-components.module';
import {LoginPageModule} from './pages/login/login.module';

import {environment} from '../../environments/environment';
import {AuthGuard} from '@homecare/shared';
import {AuthModule as AuthLibModule, TokenAuthGuard} from "@homecare-nx/auth";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthLibModule.forRoot([environment.api.domain]),
    AuthRoutingModule,
    AuthComponentsModule,
    LoginPageModule,
  ],
  providers: [
    {provide: AuthGuard, useClass: TokenAuthGuard}
  ]
})
export class AuthModule { }
