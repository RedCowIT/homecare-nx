import {Component, OnInit, ViewChild} from '@angular/core';
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {createFooterNextButton} from "../../support/footer-button-factory";
import {DirectDebitDetailsFormComponent} from "../../../../../../../libs/customer/src/lib/customer-components/direct-debit-details-form/direct-debit-details-form.component";
import {Router} from "@angular/router";
import {AlertService} from "../../../../../../../libs/core/src/lib/services/alert/alert.service";

@Component({
  selector: 'hc-job-direct-debit',
  templateUrl: './job-direct-debit.component.html',
  styleUrls: ['./job-direct-debit.component.scss']
})
export class JobDirectDebitComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  consent = false;

  @ViewChild(DirectDebitDetailsFormComponent)
  directDebitDetailsFormComponent: DirectDebitDetailsFormComponent;

  constructor(public currentJobService: CurrentJobService,
              public alertService: AlertService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.footerButtons$.next([
      {
        label: 'Skip',
        slot: 'end',
        fill: 'outline',
        callback: async () => {
          await this.next();
        }
      },
      createFooterNextButton(async () => {

        if (!this.consent) {
          const alert = await this.alertService.error(
            'Please check consent box before saving Direct Debit instruction.'
          );
          await alert.present();
          return;
        }

        if (this.directDebitDetailsFormComponent.validate()) {
          await this.directDebitDetailsFormComponent.submit();
        }

      }, 'Save')
    ])
  }

  async next() {
    await this.router.navigateByUrl(`/job/${this.currentJobService.appointmentId}/sign-off`);
  }

}
