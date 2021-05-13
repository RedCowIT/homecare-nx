import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {IonicStorageModule, Storage} from '@ionic/storage-angular';
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
import {CoreModule, DataErrorService} from "@homecare/core";
import {AppInitService, AppInitServiceFactory} from "./services/app-init/app-init.service";

import {AppErrorService} from "./services/app-error/app-error.service";
import {EntityInitService} from "./services/entity-init/entity-init.service";
import {AppDataErrorService} from "./services/app-data-error/app-data-error.service";
import {ClientStorage, StorageService} from "@homecare/storage";
import {EntityModule} from "@homecare/entity";
import {CacheStoreService} from "../../../../libs/storage/src/lib/services/cache/cache-store.service";
import {Store} from "@ngrx/store";

function storageFactory(storage: ClientStorage): StorageService {
  return new StorageService(storage);
}

function cacheStoreServiceFactory(store: Store, storage: ClientStorage): CacheStoreService {
  return new CacheStoreService(store, storage);
}

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
    EntityModule,
    MainModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {provide: DataErrorService, useClass: AppDataErrorService},
    {provide: ErrorHandler, useClass: AppErrorService},
    {provide: StorageService, useFactory: storageFactory, deps: [Storage]},
    {provide: CacheStoreService, useFactory: cacheStoreServiceFactory, deps: [Store, Storage]},
    {provide: APP_INITIALIZER, useFactory: AppInitServiceFactory, deps: [EntityInitService], multi: true},
    {provide: APP_INITIALIZER, useFactory: AppInitServiceFactory, deps: [AppInitService], multi: true}
  ]
})
export class AppModule {}
