import {Component, OnInit} from '@angular/core';
import {AppointmentBaseComponent} from "../appointment-base/appointment-base.component";
import {AppointmentsService} from "../../store/entity/services/appointments/appointments.service";
import {AppointmentCallTypesService} from "../../store/entity/services/appointment-call-types/appointment-call-types.service";
import {CallTypesService} from "../../store/entity/services/call-types/call-types.service";
import {combineLatest, Observable} from "rxjs";
import {CallType, selectEntityByKey} from "@homecare/shared";
import {map} from "rxjs/operators";

@Component({
  selector: 'hc-appointment-call-type-list',
  templateUrl: './appointment-call-type-list.component.html',
  styleUrls: ['./appointment-call-type-list.component.scss']
})
export class AppointmentCallTypeListComponent extends AppointmentBaseComponent implements OnInit {

  callTypes$: Observable<CallType[]>;
  items$: Observable<Array<{ label: string, cost: number }>>;

  constructor(public appointmentsService: AppointmentsService,
              public appointmentCallTypesService: AppointmentCallTypesService,
              public callTypesService: CallTypesService) {
    super(appointmentsService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.items$ = combineLatest([
      selectEntityByKey(this.appointmentCallTypesService, 'appointmentId', this.id),
      this.callTypesService.entityMap$
    ]).pipe(
      map(([appointmentCallTypes, callTypeMap]) => {

        return appointmentCallTypes.map(appointmentCallType => {
          return {
            label: callTypeMap[appointmentCallType.callTypeId].description,
            cost: appointmentCallType.quotedPrice
          }
        });
      })
    );

  }

}
