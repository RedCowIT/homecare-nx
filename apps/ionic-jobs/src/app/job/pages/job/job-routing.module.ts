import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {JobPage} from './job.page';
import {JobInfoComponent} from "../../job-components/job-info/job-info.component";
import {CurrentJobResolver} from "../../resolvers/current-job.resolver";

const routes: Routes = [
  {
    path: ':id',
    component: JobPage,
    resolve: {
      'appointmentId': CurrentJobResolver
    },
    canActivate: [],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'info'
      },
      {
        path: 'info',
        component: JobInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPageRoutingModule {
}
