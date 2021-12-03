import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Invoice, selectEntity} from "@homecare/shared";
import {InvoicesService} from "../../../store/entity/services/invoice/invoices/invoices.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'hc-global-payment-modal',
  templateUrl: './global-payment-modal.component.html',
  styleUrls: ['./global-payment-modal.component.scss']
})
export class GlobalPaymentModalComponent implements OnInit {

  @Input()
  invoiceId: number;

  invoice$: Observable<Invoice>;

  title = 'Pay ';

  constructor(public invoicesService: InvoicesService) {
  }

  ngOnInit(): void {
    this.invoice$ = selectEntity(this.invoicesService, this.invoiceId);

    this.invoice$.pipe(first()).subscribe(invoice => {
      this.title = 'Pay Invoice ' + invoice.invoiceNumber;
    })
  }

}
