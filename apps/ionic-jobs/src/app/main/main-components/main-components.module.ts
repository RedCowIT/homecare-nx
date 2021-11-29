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


@NgModule({
  declarations: [
    MainTabsComponent,
    MainSideNavComponent,
    JobsComponent,
    MessagesComponent,
    DocsComponent
  ],
    exports: [
        MainTabsComponent,
        MainSideNavComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        AppointmentComponentsModule,
        AuthComponentsModule
    ]
})
export class MainComponentsModule {
}
