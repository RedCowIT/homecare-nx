import {Injectable} from "@angular/core";
import {catchError, tap} from "rxjs/operators";
import {Appointment, catchHttpError} from "@homecare/shared";
import {CustomerAddressesService, CustomerPlansService, CustomersService} from "@homecare/customer";
import {AppointmentCallTypesService, AppointmentsService, AppointmentVisitsService} from "@homecare/appointment";
import {EMPTY} from "rxjs";
import {DocumentsService} from "@homecare-nx/document";


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
              private appointmentCallTypesService: AppointmentCallTypesService,
              private appointmentVisitsService: AppointmentVisitsService,
              private documentsService: DocumentsService
              ) {
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

    this.appointmentVisitsService.getWithQuery({appointmentId: `${appointment.id}`});

    this.customersService.getByKey(appointment.customerId);

    this.customerAddressesService.getByKey(appointment.addressId);

    this.customerPlansService.getWithQuery({
      customerId: `${appointment.customerId}`
    });

    this.appointmentCallTypesService.getWithQuery({
      appointmentId: `${appointment.id}`
    });

    this.documentsService.getWithQuery({
      parentId: `${appointment.customerId}`,
      subId: `${appointment.id}`
    });
  }
}
