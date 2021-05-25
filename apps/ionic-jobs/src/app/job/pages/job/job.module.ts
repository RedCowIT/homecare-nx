import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobPageRoutingModule } from './job-routing.module';

import { JobPage } from './job.page';
import {JobComponentsModule} from "../../job-components/job-components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobPageRoutingModule,
    JobComponentsModule
  ],
  declarations: [JobPage]
})
export class JobPageModule {}
