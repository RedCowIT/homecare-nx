import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {IonicStorageModule} from '@ionic/storage-angular';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IonicModule} from "@ionic/angular";
import {AppStoreModule} from "./store/app-store.module";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {MainModule} from "./main/main.module";
import {AuthModule} from "./auth/auth.module";
import {SharedModule} from "@homecare/shared";
import {CoreModule} from "@homecare/core";
import {AppInitService, AppInitServiceFactory} from "./services/app-init/app-init.service";

import {AppErrorService} from "./services/app-error/app-error.service";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    AppStoreModule,
    SharedModule,
    CoreModule,
    AuthModule,
    MainModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {provide: APP_INITIALIZER, useFactory: AppInitServiceFactory, deps: [AppInitService], multi: true},
    {provide: ErrorHandler, useClass: AppErrorService},
  ]
})
export class AppModule {}
