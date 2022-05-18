import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {CustomerPlanChangeFormComponent} from "../../../../../../../libs/customer/src/lib/customer-components/customer-plan-change/customer-plan-change-form/customer-plan-change-form.component";
import {createFooterNextButton} from "../../support/footer-button-factory";
import {CustomerPlanChangesService} from "../../../../../../../libs/customer/src/lib/store/entity/services/customer-plan-changes/customer-plan-changes.service";
import {first, mergeMap} from "rxjs/operators";
import {JobSection} from "@homecare/shared";

@Component({
  selector: 'hc-job-plan-change',
  templateUrl: './job-plan-change.component.html',
  styleUrls: ['./job-plan-change.component.scss']
})
export class JobPlanChangeComponent implements OnInit, AfterViewInit {

  @ViewChild(CustomerPlanChangeFormComponent)
  customerPlanChangeFormComponent: CustomerPlanChangeFormComponent;

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  percentChange = 0;

  constructor(public currentJobService: CurrentJobService,
              public customerPlanChangesService: CustomerPlanChangesService) { }

  ngOnInit(): void {
    this.footerButtons$.next([
      createFooterNextButton(async () => {

        if (this.customerPlanChangeFormComponent.validate()){
          await this.customerPlanChangeFormComponent.submit();
        }

      })
    ]);

    this.currentJobService.appointmentId$.pipe(
      mergeMap(appointmentId => {
        return this.customerPlanChangesService.appointmentPlanChanges(appointmentId)
      }),
      first()
    ).subscribe(customerPlanChanges => {
      if (customerPlanChanges.length){
        this.percentChange = customerPlanChanges[0].percentIncrease;
      }
    });
  }

  ngAfterViewInit(){

  }

  done(){
    this.currentJobService.completeJobSection(JobSection.PlanChange);
  }
}
