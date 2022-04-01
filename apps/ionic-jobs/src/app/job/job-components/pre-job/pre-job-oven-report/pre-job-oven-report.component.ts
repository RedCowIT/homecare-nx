import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {ShampooReportFormComponent} from "../../../../../../../../libs/appointment/src/lib/appointment-components/pre-job/shampoo-report-form/shampoo-report-form.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {AppointmentVisitsService} from "@homecare/appointment";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";
import {PreJobSection} from "@homecare/shared";
import {first} from "rxjs/operators";
import {OvenReportFormComponent} from "../../../../../../../../libs/appointment/src/lib/appointment-components/pre-job/oven-report-form/oven-report-form.component";

@Component({
  selector: 'hc-pre-job-oven-report',
  templateUrl: './pre-job-oven-report.component.html',
  styleUrls: ['./pre-job-oven-report.component.scss']
})
export class PreJobOvenReportComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  @ViewChild(OvenReportFormComponent)
  ovenReportForm: OvenReportFormComponent;

  constructor(public route: ActivatedRoute,
              public router: Router,
              public currentJobService: CurrentJobService,
              public appointmentVisitsService: AppointmentVisitsService) {

  }

  ngOnInit(): void {

    this.footerButtons$.next([
      createFooterBackButton(async () => {
        await this.currentJobService.navToPrevJobSection(PreJobSection.OvenReport);
      }),
      createFooterNextButton(async () => {

        if (this.ovenReportForm.validate()){

          console.log('Oven report valid', this.ovenReportForm.formService.form);

          this.ovenReportForm.save().pipe(first()).subscribe(
            () => {
              this.currentJobService.completePreJobSection(PreJobSection.OvenReport);
            }
          )

        }

      })
    ])
  }
}
