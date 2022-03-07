import {Component, Input, OnInit} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {AppointmentVisit, selectEntity} from "@homecare/shared";
import {AppointmentVisitsService} from "../../../store/entity/services/appointment-visits/appointment-visits.service";
import {ShampooReportFormService} from "../../../services/form/shampoo-report-form/shampoo-report-form.service";
import {Observable, of, throwError} from "rxjs";
import {catchError, first, mergeMap} from "rxjs/operators";

@Component({
  selector: 'hc-shampoo-report-form',
  templateUrl: './shampoo-report-form.component.html',
  styleUrls: ['./shampoo-report-form.component.scss'],
  providers: [ShampooReportFormService]
})
export class ShampooReportFormComponent extends EntityFormContainer<AppointmentVisit> implements OnInit {

  // @Input()
  // appointmentId: number;
  @Input()
  id: number;

  constructor(public formService: ShampooReportFormService,
              public entityService: AppointmentVisitsService) {
    super(formService, entityService);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log('ShampooReportForm', this.formService.form.value);
    // this.patchForm({appointmentId: this.appointmentId});
  }

  save(): Observable<AppointmentVisit> {

    return this.model$.pipe(
      first(),
      mergeMap(appointmentVisit => {

        const dto = this.createDTO();

        console.log('Update appointmentVisit', appointmentVisit);

        return this.entityService.update({
          ...appointmentVisit,
          shampooComments: dto.shampooComments
        });

      }),
      catchError(error => throwError(error))
    );

  }
}
