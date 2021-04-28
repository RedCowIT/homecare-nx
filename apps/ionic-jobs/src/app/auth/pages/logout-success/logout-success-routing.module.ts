import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutSuccessPage } from './logout-success.page';

const routes: Routes = [
  {
    path: '',
    component: LogoutSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoutSuccessPageRoutingModule {}
