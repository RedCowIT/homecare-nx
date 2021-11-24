import { Component, OnInit } from '@angular/core';
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {first} from "rxjs/operators";
import {Invoice, Quote} from "@homecare/shared";
import {InvoicesService} from "@homecare/billing";

@Component({
  selector: 'hc-job-invoice',
  templateUrl: './job-invoice.component.html',
  styleUrls: ['./job-invoice.component.scss']
})
export class JobInvoiceComponent implements OnInit {

  constructor(public currentJobService: CurrentJobService, public invoicesService: InvoicesService) { }

  ngOnInit(): void {
    this.currentJobService.invoice$.pipe(
      first()
    ).subscribe(invoice => {
      if (!invoice) {
        this.invoicesService.add({
          appointmentId: this.currentJobService.appointmentId
        } as Invoice);
      }
    })
  }

}
