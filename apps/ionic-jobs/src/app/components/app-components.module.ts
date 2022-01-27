import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {IonicCommonComponentsModule} from "@homecare/ionic-common";
import {EntitySyncErrorModalComponent} from "./entity-sync-error-modal/entity-sync-error-modal.component";
import {IonicModule} from "@ionic/angular";


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    IonicCommonComponentsModule,
    IonicModule
  ],
  declarations: [EntitySyncErrorModalComponent],
  exports: [
  ]
})
export class AppComponentsModule {}
