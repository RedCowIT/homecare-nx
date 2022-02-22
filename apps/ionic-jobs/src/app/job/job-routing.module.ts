import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@homecare/shared";
import {JobsResolver} from "./resolvers/jobs.resolver";

const routes: Routes = [
  {
    path: 'job',
    loadChildren: () => import('./pages/job/job.module').then(m => m.JobPageModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    resolve: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
