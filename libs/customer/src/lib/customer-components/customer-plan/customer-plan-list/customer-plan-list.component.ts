import {Component, Input, OnInit} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {CustomerPlansService} from "../../../store/entity/services/customer-plans/customer-plans.service";
import {map} from "rxjs/operators";
import {PlansService} from "@homecare/plan";
import {assertNonNull} from "@homecare/common";


@Component({
  selector: 'hc-customer-plan-list',
  templateUrl: './customer-plan-list.component.html',
  styleUrls: ['./customer-plan-list.component.scss']
})
export class CustomerPlanListComponent implements OnInit {

  @Input()
  customerId: number;

  items$: Observable<Array<{ label: string, cost: number }>>;

  constructor(private customerPlansService: CustomerPlansService,
              private plansService: PlansService) {
  }

  ngOnInit(): void {

    const customerPlans$ = this.customerPlansService.entities$.pipe(
      map(customerPlans => customerPlans.filter(customerPlan => {
        return customerPlan.customerId === this.customerId
      }))
    );

    this.items$ = combineLatest([
      customerPlans$,
      this.plansService.entityMap$
    ]).pipe(
      map(([customerPlans, plans]) => {

          return customerPlans.filter(customerPlan => customerPlan.published).map(customerPlan => {

            const plan = plans[customerPlan.planId];

            assertNonNull(plan, 'No plan for id ' + customerPlan.id);

            return {
              label: plan.description,
              cost: customerPlan.periodPrice
            };

          })

        }
      )
    );
  }

}
