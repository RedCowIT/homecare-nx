import { Component, OnInit } from '@angular/core';
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {first} from "rxjs/operators";
import {Invoice, Quote} from "@homecare/shared";
import {InvoicesService} from "@homecare/billing";
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {createFooterNextButton} from "../../support/footer-button-factory";

@Component({
  selector: 'hc-job-invoice',
  templateUrl: './job-invoice.component.html',
  styleUrls: ['./job-invoice.component.scss']
})
export class JobInvoiceComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  constructor(public currentJobService: CurrentJobService, public invoicesService: InvoicesService) { }

  ngOnInit(): void {

    this.footerButtons$.next([
      createFooterNextButton(async () => {

        console.log('Complete invoice!');

      })
    ])

    // check cache, then query, then create.



    this.currentJobService.invoice$.pipe(
      first()
    ).subscribe(invoice => {
      console.log('JobInvoice.onInit', invoice);
      if (!invoice) {
        this.invoicesService.add({
          appointmentId: this.currentJobService.appointmentId
        } as Invoice);
      }
    })
  }

}
