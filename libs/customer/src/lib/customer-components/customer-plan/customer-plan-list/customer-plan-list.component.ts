import {Component, Input, OnInit} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {CustomerPlansService} from "../../../store/entity/services/customer-plans/customer-plans.service";
import {map} from "rxjs/operators";
import {ApplianceRepairPlanService, PlansService, PlanTypesService} from "@homecare/plan";
import {assertNonNull} from "@homecare/common";
import {firstByKey, PlanType} from "@homecare/shared";
import {CustomerPlanAppliancesService} from "../../../store/entity/services/customer-plan-appliances/customer-plan-appliances.service";
import {ApplianceBrandsService, ApplianceTypesService} from "@homecare/product";


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
              private plansService: PlansService,
              private planTypesService: PlanTypesService,
              private customerPlanAppliancesService: CustomerPlanAppliancesService,
              private applianceTypeService: ApplianceTypesService,
              private applianceBrandsService: ApplianceBrandsService) {
  }

  ngOnInit(): void {

    const customerPlans$ = this.customerPlansService.entities$.pipe(
      map(customerPlans => customerPlans.filter(customerPlan => {
        return customerPlan.customerId === this.customerId
      }))
    );

    this.items$ = combineLatest([
      customerPlans$,
      this.plansService.entityMap$,
      this.planTypesService.entityMap$,
      this.customerPlanAppliancesService.entities$,
      this.applianceTypeService.entityMap$,
      this.applianceBrandsService.entityMap$
    ]).pipe(
      map(([
             customerPlans,
             plans,
             planTypes,
             customerAppliancePlans,
             applianceTypeMap,
              applianceBrandMap
           ]) => {

          return customerPlans.filter(customerPlan => customerPlan.published).map(customerPlan => {

            const plan = plans[customerPlan.planId];

            assertNonNull(plan, 'No plan for id ' + customerPlan.id);

            let label = plan.description;

            const appliancePlan = firstByKey(customerAppliancePlans, 'customerPlanId', customerPlan.id);

            if (appliancePlan){
              const type = applianceTypeMap[appliancePlan.applianceTypeId];
              const brand = applianceBrandMap[appliancePlan.brandId];

              if (type){

                label += ' ('
                if (brand){
                  label += brand.description + ' ';
                }

                label += type.description;
              }

              label += ')';
            }

            return {
              label,
              cost: customerPlan.periodPrice
            };

          })

        }
      )
    );
  }

}
