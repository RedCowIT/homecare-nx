import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {createFooterBackButton} from "../../../support/footer-button-factory";
import {PreJobSection, selectEntity} from "@homecare/shared";
import {AppointmentVisitsService} from "@homecare/appointment";
import {first, mergeMap} from "rxjs/operators";

@Component({
  selector: 'hc-pre-job-signature',
  templateUrl: './pre-job-signature.component.html',
  styleUrls: ['./pre-job-signature.component.scss']
})
export class PreJobSignatureComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  showError = false;

  constructor(public route: ActivatedRoute,
              public router: Router,
              public currentJobService: CurrentJobService,
              private appointmentVisitsService: AppointmentVisitsService) {

  }

  ngOnInit(): void {

    // this.currentJobService.getNextPreJobSectionUrl(currentSection);
    this.footerButtons$.next([
      createFooterBackButton(async () => {
        await this.currentJobService.navToPrevJobSection(PreJobSection.Signature);
      }),
      {
        label: 'Complete',
        slot: 'end',
        callback: async () => {

          this.showError = false;

          this.currentJobService.appointmentVisit$
            .pipe(first())
            .subscribe(appointmentVisit => {

              console.log('Signature', appointmentVisit.preInspectionSignatureJSON);

              if (!appointmentVisit.preInspectionSignatureJSON) {
                this.showError = true;
                return;
              }

              this.appointmentVisitsService.update(appointmentVisit).pipe(first()).subscribe(async () => {
                await this.currentJobService.completePreJobSection(PreJobSection.Signature);
              });

            });

        }

      }
    ])
  }

  updateSignature(data) {

    console.log('updateSignature', data);

    this.appointmentVisitsService.updateOneInCache({
      id: this.currentJobService.appointmentId,
      preInspectionSignatureJSON: data
    });

    if (data) {
      this.showError = false;
    }
  }
}
