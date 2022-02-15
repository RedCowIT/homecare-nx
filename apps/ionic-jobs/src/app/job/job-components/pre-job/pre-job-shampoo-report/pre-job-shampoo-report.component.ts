import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {VacuumReportFormComponent} from "../../../../../../../../libs/appointment/src/lib/appointment-components/pre-job/vacuum-report-form/vacuum-report-form.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";
import {PreJobSection} from "@homecare/shared";
import {ShampooReportFormComponent} from "../../../../../../../../libs/appointment/src/lib/appointment-components/pre-job/shampoo-report-form/shampoo-report-form.component";
import {AppointmentVisitsService} from "@homecare/appointment";
import {first} from "rxjs/operators";

@Component({
  selector: 'hc-pre-job-shampoo-report',
  templateUrl: './pre-job-shampoo-report.component.html',
  styleUrls: ['./pre-job-shampoo-report.component.scss']
})
export class PreJobShampooReportComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  @ViewChild(ShampooReportFormComponent)
  shampooReportForm: ShampooReportFormComponent;

  constructor(public route: ActivatedRoute,
              public router: Router,
              public currentJobService: CurrentJobService,
              public appointmentVisitsService: AppointmentVisitsService) {

  }

  ngOnInit(): void {

    this.footerButtons$.next([
      createFooterBackButton(async () => {
        await this.currentJobService.navToPrevJobSection(PreJobSection.ShampooReport);
      }),
      createFooterNextButton(async () => {

        if (this.shampooReportForm.validate()){

          this.shampooReportForm.save().pipe(first()).subscribe(
            () => {
              this.currentJobService.completePreJobSection(PreJobSection.ShampooReport);
            }
          )

        }

      })
    ])
  }
}
