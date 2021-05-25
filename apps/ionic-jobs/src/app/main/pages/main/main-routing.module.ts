import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPage} from './main.page';
import {JobsComponent} from "../../main-components/jobs/jobs/jobs.component";
import {MessagesComponent} from "../../main-components/messages/messages/messages.component";
import {DocsComponent} from "../../main-components/docs/docs/docs.component";

const routes: Routes = [
  {
    path: '',
    component: MainPage,

    children: [
      {
        path: 'jobs',
        component: JobsComponent
      },
      {
        path: 'docs',
        component: DocsComponent
      },
      {
        path: 'messages',
        component: MessagesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
