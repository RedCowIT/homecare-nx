import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {ApplianceTypesService} from "@homecare/product";
import {first, map} from "rxjs/operators";
import {CustomerApplianceModalComponent} from "../../../../../../../../libs/customer/src/lib/customer-components/appliance/customer-appliance-modal/customer-appliance-modal.component";
import {ModalController} from "@ionic/angular";
import {QuoteApplianceDetailModalComponent} from "../../../../../../../../libs/billing/src/lib/billing-components/quote/quote-appliance-detail-modal/quote-appliance-detail-modal.component";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {QuoteApplianceDetailsService, QuoteItemsService} from "@homecare/billing";
import {findByKey, firstItem, PreJobSection, QuoteSection} from "@homecare/shared";
import {QuoteManagerService} from "../../../../../../../../libs/billing/src/lib/services/quote-manager/quote-manager.service";
import {ButtonConfig} from "@homecare/common";
import {Router} from "@angular/router";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";

@Component({
  selector: 'hc-quote-appliance-cover',
  templateUrl: './quote-appliance-cover.component.html',
  styleUrls: ['./quote-appliance-cover.component.scss']
})
export class QuoteApplianceCoverComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  iconTiles$: Observable<Array<{ label: string, icon: string, badge?: string, id: number, highlight: boolean }>>;

  constructor(public applianceTypesService: ApplianceTypesService,
              public currentJobService: CurrentJobService,
              public quoteManagerService: QuoteManagerService,
              public modalCtrl: ModalController,
              public router: Router) {
  }

  ngOnInit(): void {

    this.footerButtons$.next([
      createFooterNextButton(async () => {

        this.currentJobService.completeQuoteSection(QuoteSection.ApplianceCover);

      })
    ])

    this.iconTiles$ = combineLatest([
      this.applianceTypesService.entities$,
      this.quoteManagerService.getQuoteApplianceDetails(this.currentJobService.appointmentId)
    ]).pipe(
      map(([applianceTypes, quoteApplianceDetails]) => {

        return applianceTypes.map(applianceType => {

          const quoteApplianceDetailsMatch = findByKey(quoteApplianceDetails, 'applianceTypeId', applianceType.id);

          return {
            id: applianceType.id,
            label: applianceType.description,
            icon: applianceType.appImgURL,
            badge: quoteApplianceDetailsMatch.length > 0 ? '&check;' : '',
            highlight: quoteApplianceDetailsMatch.length > 0 //change
          }
        })
      })
    );
  }

  async openApplianceModal(applianceTypeId: number) {

    combineLatest([
      this.currentJobService.quote$,
      this.quoteManagerService.getQuoteApplianceDetailsWithType(this.currentJobService.appointmentId, applianceTypeId)
    ]).pipe(
      first()
    ).subscribe(async ([quote, quoteApplianceDetails]) => {



      const componentProps: any = {
        applianceTypeId,
        quoteId: quote.id
      };

      if (quoteApplianceDetails.length) {
        componentProps.quoteApplianceDetailId = firstItem(quoteApplianceDetails).id;
      }

      console.log('openApplianceModel', {
        applianceTypeId, quote, quoteApplianceDetails, componentProps
      });

      const modal = await this.modalCtrl.create({
        component: QuoteApplianceDetailModalComponent,
        componentProps
      });

      await modal.present();

    });

  }

}