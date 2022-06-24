import {Component, Input, OnInit} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {AppointmentVisit} from "@homecare/shared";
import {AppointmentVisitsService} from "../../../store/entity/services/appointment-visits/appointment-visits.service";
import {Observable, of, throwError} from "rxjs";
import {catchError, first, mergeMap} from "rxjs/operators";
import {OvenReportFormService} from "../../../services/form/oven-report-form/oven-report-form.service";

@Component({
  selector: 'hc-oven-report-form',
  templateUrl: './oven-report-form.component.html',
  styleUrls: ['./oven-report-form.component.scss'],
  providers: [OvenReportFormService]
})
export class OvenReportFormComponent extends EntityFormContainer<AppointmentVisit> implements OnInit {

  // @Input()
  // appointmentId: number;
  @Input()
  id: number;

  constructor(public formService: OvenReportFormService,
              public entityService: AppointmentVisitsService) {
    super(formService, entityService);
  }

  ngOnInit() {
    super.ngOnInit();

    // this.patchForm({appointmentId: this.appointmentId});
  }

  save(): Observable<AppointmentVisit> {

    return this.model$.pipe(
      first(),
      mergeMap(appointmentVisit => {

        const dto = this.createDTO();



        return this.entityService.update({
          ...appointmentVisit,
          ovenComments: dto.ovenComments
        });


      }),
      catchError(error => throwError(error))
    );

  }

}
