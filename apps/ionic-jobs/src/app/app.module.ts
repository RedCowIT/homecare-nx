import {NgModule} from '@angular/core';
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

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    AppStoreModule,
    MainModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    StatusBar,
    SplashScreen
  ]
})
export class AppModule {}
