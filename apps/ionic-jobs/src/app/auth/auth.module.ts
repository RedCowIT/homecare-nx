import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponentsModule} from './components/auth-components.module';
import {LoginPageModule} from './pages/login/login.module';
import {Auth0Guard, Auth0Module} from '@homecare/auth0';
import {environment} from '../../environments/environment';
import {AuthGuard} from '@homecare/shared';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Auth0Module.forRoot(environment.auth, [environment.api.domain]),
    AuthRoutingModule,
    AuthComponentsModule,
    LoginPageModule,
  ],
  providers: [
    {provide: AuthGuard, useClass: Auth0Guard}
  ]
})
export class AuthModule { }
