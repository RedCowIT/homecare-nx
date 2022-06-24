import {Component, Input, OnInit} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {AppointmentVisit} from "@homecare/shared";
import {AppointmentVisitsService} from "../../../store/entity/services/appointment-visits/appointment-visits.service";
import {VacuumReportFormService} from "../../../services/form/vacuum-report-form/vacuum-report-form.service";
import {Observable, throwError} from "rxjs";
import {catchError, first, mergeMap} from "rxjs/operators";

@Component({
  selector: 'hc-vacuum-report-form',
  templateUrl: './vacuum-report-form.component.html',
  styleUrls: ['./vacuum-report-form.component.scss'],
  providers: [VacuumReportFormService]
})
export class VacuumReportFormComponent extends EntityFormContainer<AppointmentVisit> implements OnInit {

  @Input()
  id: number;

  washFilterOptions = [
    { id: '0', description: 'Never' },
    { id: 'Every Month', description: 'Every Month' },
    { id: 'Every 3 Months', description: 'Every 3 Months' },
    { id: 'Every 6 Months', description: 'Every 6 Months' },
    { id: 'Every 12 Months', description: 'Every 12 Months' }
  ];

  constructor(public formService: VacuumReportFormService,
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
          qIndependentCompany: dto.qIndependentCompany,
          qServiceCost: dto.qServiceCost,
          qWashFilters: dto.qWashFilters,
          qEfficiency: dto.qEfficiency,
          qParts: dto.qParts
        });

      }),
      catchError(error => throwError(error))
    );

  }
}
