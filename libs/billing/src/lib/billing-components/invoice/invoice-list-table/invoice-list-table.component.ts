import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {InvoiceListTableService} from "../../../services/invoice/invoice-list-table/invoice-list-table.service";

@Component({
  selector: 'hc-invoice-list-table',
  templateUrl: './invoice-list-table.component.html',
  styleUrls: ['./invoice-list-table.component.scss'],
  providers: [InvoiceListTableService]
})
export class InvoiceListTableComponent implements AfterViewInit {

  /**
   * Optional appointmentId filter
   */
  @Input()
  appointmentId: number;

  @Input()
  query: { startDate: string, endDate: string } | undefined;

  @ViewChild('valueTemplate') valueTmpl: TemplateRef<any> | undefined;

  constructor(public invoiceListTableService: InvoiceListTableService,
              public cdRef: ChangeDetectorRef) { }


  select(event){

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.invoiceListTableService.init(this.appointmentId, {value: this.valueTmpl});
    this.loadData();
    this.cdRef.detectChanges();
  }

  loadData(){
    this.invoiceListTableService.load(this.query);
  }
}
