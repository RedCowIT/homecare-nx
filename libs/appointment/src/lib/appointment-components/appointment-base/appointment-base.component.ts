import {AppointmentsService} from "../../store/entity/services/appointments/appointments.service";
import {Appointment, EntityContainer} from "@homecare/shared";
import {Component, Input} from "@angular/core";

@Component({
  selector: 'hc-appointment-container',
  template: ''
})
export class AppointmentBaseComponent extends EntityContainer<Appointment>{

  @Input()
  id: number;

  public constructor(public appointmentsService: AppointmentsService) {
    super(appointmentsService);
  }

}
