import {Component, OnInit, ViewChild} from '@angular/core';
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {createFooterNextButton} from "../../support/footer-button-factory";
import {DirectDebitDetailsFormComponent} from "../../../../../../../libs/customer/src/lib/customer-components/direct-debit-details-form/direct-debit-details-form.component";
import {Router} from "@angular/router";
import {AlertService} from "../../../../../../../libs/core/src/lib/services/alert/alert.service";
import {JobSection, SubscribedContainer} from "@homecare/shared";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'hc-job-direct-debit',
  templateUrl: './job-direct-debit.component.html',
  styleUrls: ['./job-direct-debit.component.scss']
})
export class JobDirectDebitComponent extends SubscribedContainer implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  consent = false;

  error: string;

  @ViewChild(DirectDebitDetailsFormComponent)
  directDebitDetailsFormComponent: DirectDebitDetailsFormComponent;

  constructor(public currentJobService: CurrentJobService,
              public alertService: AlertService,
              public router: Router) {
    super();
  }

  ngOnInit(): void {

    this.currentJobService.job$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(job => {

      const buttons = [];

      if (!job.requireDirectDebit){
        buttons.push({
          label: 'Skip',
          slot: 'end',
          fill: 'outline',
          callback: async () => {
            await this.next();
          }
        });
      }

      buttons.push(
        createFooterNextButton(async () => {

          if (!this.consent) {
            const alert = await this.alertService.error(
              'Please check consent box before saving Direct Debit instruction.'
            );
            await alert.present();
            return;
          }

          if (this.directDebitDetailsFormComponent.validate()) {
            this.error = null;
            await this.directDebitDetailsFormComponent.submit();
          } else {
            this.error = 'Invalid direct debit details, check your entry and try again.';
          }

        }, 'Save')
      );


      this.footerButtons$.next(buttons);

    });
  }

  async next() {
    this.currentJobService.completeJobSection(JobSection.DD);
  }

}
