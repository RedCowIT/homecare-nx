import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainTabsComponent} from './main-tabs/main-tabs.component';
import {IonicModule} from "@ionic/angular";
import {MainSideNavComponent} from './main-side-nav/main-side-nav.component';
import {RouterModule} from "@angular/router";
import {JobsComponent} from './jobs/jobs/jobs.component';
import {AppointmentComponentsModule} from "@homecare/appointment";
import { MessagesComponent } from './messages/messages/messages.component';
import { DocsComponent } from './docs/docs/docs.component';
import {AuthComponentsModule} from "../../auth/components/auth-components.module";
import { StoreLogsComponent } from './store-logs/store-logs.component';
import {IonicCommonComponentsModule} from "@homecare/ionic-common";


@NgModule({
  declarations: [
    MainTabsComponent,
    MainSideNavComponent,
    JobsComponent,
    MessagesComponent,
    DocsComponent,
    StoreLogsComponent
  ],
    exports: [
        MainTabsComponent,
        MainSideNavComponent,
        StoreLogsComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        AppointmentComponentsModule,
        AuthComponentsModule,
        IonicCommonComponentsModule
    ]
})
export class MainComponentsModule {
}
