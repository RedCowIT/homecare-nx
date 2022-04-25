import {Component, Input, OnInit} from '@angular/core';
import {CustomerPlanChangesFormService} from "../../../services/form/customer-plan-changes-form/customer-plan-changes-form.service";
import {CustomerPlanChangesService} from "../../../store/entity/services/customer-plan-changes/customer-plan-changes.service";
import {first} from "rxjs/operators";
import {CustomerPlansService} from "../../../store/entity/services/customer-plans/customer-plans.service";
import {PlansService} from "@homecare/plan";
import {combineLatest} from "rxjs";

@Component({
  selector: 'hc-customer-plan-change-form',
  templateUrl: './customer-plan-change-form.component.html',
  styleUrls: ['./customer-plan-change-form.component.scss'],
  providers: [CustomerPlanChangesFormService]
})
export class CustomerPlanChangeFormComponent implements OnInit {

  @Input()
  appointmentId: number;

  constructor(public customerPlanChangesFormService: CustomerPlanChangesFormService,
              public customerPlanChangesService: CustomerPlanChangesService,
              public customerPlansService: CustomerPlansService,
              public plansService: PlansService) {
  }

  ngOnInit(): void {
    combineLatest([
      this.customerPlanChangesService.appointmentPlanChanges(this.appointmentId),
      this.customerPlansService.entityMap$,
      this.plansService.entityMap$
    ]).pipe(
      first()
    ).subscribe(([
                   customerPlanChanges,
                   customerPlans,
                   plans
                 ]) => {
      const changes = customerPlanChanges.map((change => {
        return {
          ...change,
          description: plans[customerPlans[change.customerPlanId].planId].description
        }
      }));
      this.customerPlanChangesFormService.init(changes);
    });
  }

  public validate(): boolean {
    this.customerPlanChangesFormService.form.markAllAsTouched();
    return this.customerPlanChangesFormService.form.valid;
  }

  submit() {

    const dto = this.customerPlanChangesFormService.form.value.customerPlanChanges;
    console.log('submit', dto);
    this.customerPlanChangesService.addAll(dto).pipe(
      first()
    ).subscribe(response => {
      console.log('add all complete');
    });
  }

}
