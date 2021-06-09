import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";
import {Appointment} from "@homecare/shared";
import {CustomerAddressesService, CustomerPlansService, CustomersService} from "@homecare/customer";
import {AppointmentCallTypesService, AppointmentsService} from "@homecare/appointment";


/**
 * Preload job data
 */
@Injectable({
  providedIn: 'root'
})
export class JobsLoaderService {
  constructor(private appointmentsService: AppointmentsService,
              private customersService: CustomersService,
              private customerAddressesService: CustomerAddressesService,
              private customerPlansService: CustomerPlansService,
              private appointmentCallTypesService: AppointmentCallTypesService) {
  }

  loadAll() {
    this.appointmentsService.getAll().pipe(
      tap(appointments => {

        for (const appointment of appointments) {
          this.loadAppointmentRelations(appointment);
        }

      })
    ).subscribe()
  }

  loadAppointmentRelations(appointment: Appointment) {

    this.customersService.getByKey(appointment.customerId);

    this.customerAddressesService.getByKey(appointment.addressId);

    this.customerPlansService.getWithQuery({
      customerId: `${appointment.customerId}`
    });

    this.appointmentCallTypesService.getWithQuery({
      appointmentId: `${appointment.id}`
    });
  }
}
