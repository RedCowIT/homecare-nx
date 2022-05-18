import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";
import {findByKey, firstItem, PlanTypes, QuoteSection} from "@homecare/shared";
import {first, map} from "rxjs/operators";
import {PlansService, PlanTypesService} from "@homecare/plan";
import {QuoteManagerService} from "../../../../../../../../libs/billing/src/lib/services/quote-manager/quote-manager.service";
import {QuoteApplianceDetailModalComponent} from "../../../../../../../../libs/billing/src/lib/billing-components/quote/quote-appliance-detail-modal/quote-appliance-detail-modal.component";
import {ModalController} from "@ionic/angular";
import {QuotePlanDetailModalComponent} from "../../../../../../../../libs/billing/src/lib/billing-components/quote/quote-plan-detail-modal/quote-plan-detail-modal.component";

@Component({
  selector: 'hc-quote-other-plans',
  templateUrl: './quote-other-plans.component.html',
  styleUrls: ['./quote-other-plans.component.scss']
})
export class QuoteOtherPlansComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  iconTiles$: Observable<Array<{ label: string, icon: string, badge?: string, id: number, highlight: boolean }>>;

  constructor(public currentJobService: CurrentJobService,
              public planTypesService: PlanTypesService,
              public quoteManagerService: QuoteManagerService,
              public plansService: PlansService,
              public modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.footerButtons$.next([
      createFooterBackButton(async () => {

        this.currentJobService.navToPrevQuoteSection(QuoteSection.OtherPlans);

      }),
      createFooterNextButton(async () => {

        this.currentJobService.completeQuoteSection(QuoteSection.OtherPlans);

      })
    ]);

    this.iconTiles$ = combineLatest([
      this.planTypesService.getCommercialPlanTypes(),
      this.plansService.entityMap$,
      this.quoteManagerService.getQuotePlanDetails(this.currentJobService.appointmentId)
    ]).pipe(
      map(([planTypes, plans, quotePlanDetails]) => {

        return planTypes.filter(planType => {
          return planType.description !== PlanTypes.ApplianceRepairPlan &&
            planType.description !== PlanTypes.Finance
        }).map(planType => {

          console.log('quotePlanDetails', quotePlanDetails);
          let match = false;

          for (const quotePlanDetail of quotePlanDetails){
            const plan = plans[quotePlanDetail.planId];
            if (plan.planTypeId === planType.id){
              match = true;
            }
          }

          // const quoteDetailsMatch = findByKey(quotePlanDetails, 'planTypeId', planType.id);

          return {
            id: planType.id,
            label: planType.description,
            icon: planType.icon,
            badge: match ? '&check;' : '',
            highlight: match
          };

        })
      })
    );
  }

  openPlanModal(planTypeId) {

    combineLatest([
      this.currentJobService.quote$,
      this.quoteManagerService.getQuotePlanDetailsWithType(this.currentJobService.appointmentId, planTypeId)
    ]).pipe(
      first()
    ).subscribe(async ([quote, quotePlanDetails]) => {

      const componentProps: any = {
        planTypeId,
        quoteId: quote.id
      };

      if (quotePlanDetails.length) {
        componentProps.quotePlanDetailId = firstItem(quotePlanDetails).id;
      }

      const modal = await this.modalCtrl.create({
        component: QuotePlanDetailModalComponent,
        componentProps
      });

      await modal.present();

    });

  }
}
