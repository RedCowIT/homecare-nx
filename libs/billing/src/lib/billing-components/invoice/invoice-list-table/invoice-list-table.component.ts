import {Component, Input, OnInit} from '@angular/core';
import {InvoiceListTableService} from "../../../services/invoice/invoice-list-table/invoice-list-table.service";

@Component({
  selector: 'hc-invoice-list-table',
  templateUrl: './invoice-list-table.component.html',
  styleUrls: ['./invoice-list-table.component.scss'],
  providers: [InvoiceListTableService]
})
export class InvoiceListTableComponent implements OnInit {

  /**
   * Optional appointmentId filter
   */
  @Input()
  appointmentId: number;

  constructor(public invoiceListTableService: InvoiceListTableService) { }

  ngOnInit(): void {
    this.invoiceListTableService.init(this.appointmentId);
    this.invoiceListTableService.load();
  }

  select(event){
    console.log('select', event);
  }

}
