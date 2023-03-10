import {Component, OnInit} from '@angular/core';
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {BehaviorSubject, Observable} from "rxjs";
import {CardPayment, Customer, JobSection, selectEntity} from "@homecare/shared";
import {CustomersService} from "@homecare/customer";
import {first, mergeMap} from "rxjs/operators";
import {ModalController} from "@ionic/angular";
import {GlobalPaymentModalComponent} from "../../../../../../../libs/billing/src/lib/billing-components/payment/global-payment-modal/global-payment-modal.component";
import {CardPaymentsService} from "@homecare/billing";
import {createFooterNextButton} from "../../support/footer-button-factory";
import {ButtonConfig} from "@homecare/common";

@Component({
  selector: 'hc-job-payment',
  templateUrl: './job-payment.component.html',
  styleUrls: ['./job-payment.component.scss']
})
export class JobPaymentComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  customer$: Observable<Customer>;

  cardPayments$: Observable<CardPayment[]>;

  constructor(public currentJobService: CurrentJobService,
              public customersService: CustomersService,
              public cardPaymentsService: CardPaymentsService,
              public modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.customer$ = this.currentJobService.invoice$.pipe(
      mergeMap(invoice => {
        return selectEntity(this.customersService, invoice.customerId);
      })
    );

    this.cardPayments$ = this.currentJobService.invoice$.pipe(
      mergeMap(invoice => {
        return this.cardPaymentsService.appointmentPayments(invoice.appointmentId);
      })
    );

    this.currentJobService.invoice$.pipe(first())
      .subscribe(invoice => {
        this.loadCardPayments(invoice.appointmentId);
      });

    this.footerButtons$.next([
      createFooterNextButton(async () => {

        this.next();

      })
    ])
  }

  makePayment() {

    this.currentJobService.invoice$.pipe(first()).subscribe(
      async invoice => {

        const modal = await this.modalCtrl.create({
          component: GlobalPaymentModalComponent,
          componentProps: {invoiceId: invoice.id},
          backdropDismiss: false,
          cssClass: 'fullscreen'
        });

        modal.onWillDismiss().then((detail) => {
          if (detail.role === 'success') {
            this.loadCardPayments(invoice.appointmentId);
          }
        })

        await modal.present();

      }
    )


  }

  loadCardPayments(appointmentId: number) {
    this.cardPaymentsService.getWithQuery({
      appointmentId: `${appointmentId}`
    });
  }

  next(){
    this.currentJobService.completeJobSection(JobSection.Payment);
  }
}
