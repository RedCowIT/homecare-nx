import {Component, OnInit, ViewChild} from '@angular/core';
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {ActivatedRoute, Router} from "@angular/router";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";
import {PreJobSection} from "@homecare/shared";
import {VacuumReportFormComponent} from "../../../../../../../../libs/appointment/src/lib/appointment-components/pre-job/vacuum-report-form/vacuum-report-form.component";
import {first} from "rxjs/operators";

@Component({
  selector: 'hc-pre-job-vacuum-report',
  templateUrl: './pre-job-vacuum-report.component.html',
  styleUrls: ['./pre-job-vacuum-report.component.scss']
})
export class PreJobVacuumReportComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  @ViewChild(VacuumReportFormComponent)
  vacuumReportForm: VacuumReportFormComponent;

  constructor(public route: ActivatedRoute,
              public router: Router,
              public currentJobService: CurrentJobService) {

  }

  ngOnInit(): void {

    // this.currentJobService.getNextPreJobSectionUrl(currentSection);
    this.footerButtons$.next([
      createFooterBackButton(async () => {
        await this.currentJobService.navToPrevJobSection(PreJobSection.VacuumReport);
      }),
      createFooterNextButton(async () => {

        if (this.vacuumReportForm.validate()){

          this.vacuumReportForm.save().pipe(first()).subscribe(
            () => {
              this.currentJobService.completePreJobSection(PreJobSection.VacuumReport);
            }
          );


        }

      })
    ])
  }
}
