import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {PendingPaymentTableService} from "../../../services/payment/pending-payment/pending-payment-table.service";

@Component({
  selector: 'hc-pending-payments-table',
  templateUrl: './pending-payments-table.component.html',
  styleUrls: ['./pending-payments-table.component.scss'],
  providers: [PendingPaymentTableService]
})
export class PendingPaymentsTableComponent implements OnChanges, AfterViewInit {

  @Input()
  query: { startDate: string, endDate: string } | undefined;

  @ViewChild('currencyTemplate') currencyTmpl: TemplateRef<any> | undefined;

  constructor(public tableSource: PendingPaymentTableService) { }

  ngAfterViewInit() {

    this.tableSource.init({amount: this.currencyTmpl, total: this.currencyTmpl});
    this.loadData();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.query) {
      this.loadData();
    }
  }

  loadData() {
    if (this.tableSource.hasInitialized && this.query?.startDate && this.query?.endDate) {
      console.log('loadData');
      this.tableSource.load(this.query);
    }
  }

}
