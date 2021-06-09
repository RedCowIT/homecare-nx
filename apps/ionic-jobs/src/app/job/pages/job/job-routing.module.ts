import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {JobPage} from './job.page';
import {JobInfoComponent} from "../../job-components/job-info/job-info.component";
import {CurrentJobResolver} from "../../resolvers/current-job.resolver";
import {JobPreJobComponent} from "../../job-components/job-pre-job/job-pre-job.component";
import {PreJobWorkSummaryComponent} from "../../job-components/pre-job/pre-job-work-summary/pre-job-work-summary.component";
import {PreJobAppliancesComponent} from "../../job-components/pre-job/pre-job-appliances/pre-job-appliances.component";

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
      },
      {
        path: 'pre-job',
        component: JobPreJobComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'work-summary'
          },
          {
            path: 'work-summary',
            component: PreJobWorkSummaryComponent
          },
          {
            path: 'appliances',
            component: PreJobAppliancesComponent
          }
        ]
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
