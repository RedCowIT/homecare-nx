import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {InvoiceListTableService} from "../../../services/invoice/invoice-list-table/invoice-list-table.service";

@Component({
  selector: 'hc-invoice-list-table',
  templateUrl: './invoice-list-table.component.html',
  styleUrls: ['./invoice-list-table.component.scss'],
  providers: [InvoiceListTableService]
})
export class InvoiceListTableComponent implements OnInit, AfterViewInit {

  /**
   * Optional appointmentId filter
   */
  @Input()
  appointmentId: number;

  @ViewChild('valueTemplate') valueTmpl: TemplateRef<any> | undefined;

  constructor(public invoiceListTableService: InvoiceListTableService,
              public cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.invoiceListTableService.load();
  }

  select(event){
    console.log('select', event);
  }


  ngAfterViewInit() {
    this.invoiceListTableService.init(this.appointmentId, {value: this.valueTmpl});
    this.invoiceListTableService.load();
    this.cdRef.detectChanges();
  }
}
