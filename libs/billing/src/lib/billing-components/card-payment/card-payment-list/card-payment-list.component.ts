import {Component, Input, OnInit} from '@angular/core';
import {CardPaymentsService} from "../../../store/entity/services/card-payment/card-payments.service";
import {Observable} from "rxjs";
import {CardPayment} from "@homecare/shared";

@Component({
  selector: 'hc-card-payment-list',
  templateUrl: './card-payment-list.component.html',
  styleUrls: ['./card-payment-list.component.scss']
})
export class CardPaymentListComponent implements OnInit {

  @Input()
  appointmentId: number;

  cardPayments$: Observable<CardPayment[]>;

  constructor(public cardPaymentsService: CardPaymentsService) {
  }

  ngOnInit(): void {
    this.cardPayments$ = this.cardPaymentsService.appointmentPayments(this.appointmentId);
  }

}
