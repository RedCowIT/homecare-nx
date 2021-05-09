import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTabsComponent } from './main-tabs/main-tabs.component';
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [
    MainTabsComponent
  ],
  exports: [
    MainTabsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class MainComponentsModule { }
