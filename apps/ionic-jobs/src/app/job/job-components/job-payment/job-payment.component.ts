import {Component, OnInit} from '@angular/core';
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {Observable} from "rxjs";
import {Customer, firstItem, selectEntity} from "@homecare/shared";
import {CustomersService} from "@homecare/customer";
import {first, mergeMap} from "rxjs/operators";
import {QuotePlanDetailModalComponent} from "../../../../../../../libs/billing/src/lib/billing-components/quote/quote-plan-detail-modal/quote-plan-detail-modal.component";
import {ModalController} from "@ionic/angular";
import {GlobalPaymentModalComponent} from "../../../../../../../libs/billing/src/lib/billing-components/payment/global-payment-modal/global-payment-modal.component";

@Component({
  selector: 'hc-job-payment',
  templateUrl: './job-payment.component.html',
  styleUrls: ['./job-payment.component.scss']
})
export class JobPaymentComponent implements OnInit {

  customer$: Observable<Customer>;

  constructor(public currentJobService: CurrentJobService,
              public customersService: CustomersService,
              public modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.customer$ = this.currentJobService.invoice$.pipe(
      mergeMap(invoice => {
        console.log('CUSTOMER INVOIEC', invoice);

        return selectEntity(this.customersService, invoice.customerId);
      })
    );
  }

  makePayment() {

    this.currentJobService.invoice$.pipe(first()).subscribe(
      async invoice => {

        const modal = await this.modalCtrl.create({
          component: GlobalPaymentModalComponent,
          componentProps: {invoiceId: invoice.id},
          backdropDismiss: false
        });

        await modal.present();

      }
    )


  }

}