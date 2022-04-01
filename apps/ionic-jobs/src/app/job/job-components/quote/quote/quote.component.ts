import {Component, OnInit} from '@angular/core';
import {PlatformService} from "@homecare/core";
import {QuotesService} from "@homecare/billing";
import {Quote, selectEntityByKey} from "@homecare/shared";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {filter, first} from "rxjs/operators";

/**
 * Base Quote component
 *
 * Creates Quote if none is assigned to current appointment.
 */
@Component({
  selector: 'hc-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  constructor(public platform: PlatformService,
              public currentJobService: CurrentJobService,
              public quotesService: QuotesService) {
  }

  ngOnInit(): void {
    this.currentJobService.quote$.pipe(
      first()
    ).subscribe(quote => {
      if (!quote) {

        console.log('QuoteCmp.', quote);

        this.currentJobService.appointment$.pipe(
          filter(appointment => !!appointment),
          first()
        ).subscribe(
          appointment => {
            this.quotesService.add({
              appointmentId: appointment.id,
              customerId: appointment.customerId
            } as Quote);
          }
        );
      } else {

      }
    })
  }

  redirectOnAccepted() {
    console.log('redirectOnAccepted');
  }
}
