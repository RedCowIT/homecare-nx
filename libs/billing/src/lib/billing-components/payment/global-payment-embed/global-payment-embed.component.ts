import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {GlobalPaymentRequest} from "@homecare/shared";
import {GlobalPaymentsClientService} from "../../../services/payment/global-payments/global-payments-client.service";
import {GlobalPaymentsService} from "../../../services/payment/global-payments/global-payments.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'hc-global-payment-embed',
  templateUrl: './global-payment-embed.component.html',
  styleUrls: ['./global-payment-embed.component.scss'],
  providers: [GlobalPaymentsClientService]
})
export class GlobalPaymentEmbedComponent implements OnChanges {

  @Input()
  globalPaymentRequest: GlobalPaymentRequest;

  @Output()
  done = new EventEmitter<any>();

  readonly iframeId = 'realex';
  readonly checkoutButtonId = 'realexPay';

  constructor(public globalPaymentsClientService: GlobalPaymentsClientService) {
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.globalPaymentRequest) {
      this.checkout();
    }
  }

  checkout() {
    this.globalPaymentsClientService.checkout(this.iframeId, this.globalPaymentRequest)
      .pipe(first())
      .subscribe(result => {
        this.done.emit(result);
      });
  }

}
