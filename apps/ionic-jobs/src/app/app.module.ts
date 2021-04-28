import {APP_INITIALIZER, NgModule} from '@angular/core';
import {IonicStorageModule} from '@ionic/storage-angular';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IonicModule} from "@ionic/angular";
import {AppStoreModule} from "./store/app-store.module";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {CommonModule} from "@angular/common";
import {MainModule} from "./main/main.module";
import {AuthModule} from "./auth/auth.module";
import {SharedModule} from "@homecare/shared";
import {CoreModule} from "@homecare/core";
import {AppInitService, AppInitServiceFactory} from "./services/app-init/app-init.service";

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
    StatusBar,
    SplashScreen,
    {provide: APP_INITIALIZER, useFactory: AppInitServiceFactory, deps: [AppInitService], multi: true},
  ]
})
export class AppModule {}
