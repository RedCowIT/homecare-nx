import {Injectable} from "@angular/core";
import {catchError, filter, first, map, mergeMap, tap} from "rxjs/operators";
import {
  Appointment,
  AppointmentVisit,
  firstByKey,
  firstItem, joinEntityLoading,
  QuoteItemTypes, selectOrFetchEntity,
  selectOrFetchFirstEntityByKey
} from "@homecare/shared";
import {CustomerAddressesService, CustomerPlansService, CustomersService} from "@homecare/customer";
import {AppointmentCallTypesService, AppointmentsService, AppointmentVisitsService} from "@homecare/appointment";
import {combineLatest, forkJoin, Observable, of, throwError} from "rxjs";
import {DocumentsService} from "@homecare-nx/document";
import {
  InvoiceItemsService,
  InvoicesService,
  QuoteApplianceDetailsService,
  QuoteItemsService,
  QuoteItemTypesService,
  QuotePlanDetailsService,
  QuoteProductDetailsService,
  QuotesService
} from "@homecare/billing";
import {PolicyService} from "@homecare/core";
import {QuoteManagerService} from "../../../../../../../libs/billing/src/lib/services/quote-manager/quote-manager.service";


/**
 * Preload job data
 */
@Injectable({
  providedIn: 'root'
})
export class JobsLoaderService {

  loading$: Observable<boolean>;

  constructor(private appointmentsService: AppointmentsService,
              private customersService: CustomersService,
              private customerAddressesService: CustomerAddressesService,
              private customerPlansService: CustomerPlansService,
              private appointmentCallTypesService: AppointmentCallTypesService,
              private appointmentVisitsService: AppointmentVisitsService,
              private documentsService: DocumentsService,
              private invoicesService: InvoicesService,
              private invoiceItemsService: InvoiceItemsService,
              private policiesService: PolicyService,
              private quotesService: QuotesService,
              private quoteItemsService: QuoteItemsService,
              private quoteItemTypesService: QuoteItemTypesService,
              private quoteApplianceDetailsService: QuoteApplianceDetailsService,
              private quoteProductDetailsService: QuoteProductDetailsService,
              private quotePlanDetailsService: QuotePlanDetailsService,
              private quoteManagerService: QuoteManagerService
  ) {
    this.loading$ = joinEntityLoading([
      this.appointmentsService,
      this.appointmentVisitsService,
      this.customersService,
      this.customerAddressesService,
      this.customerPlansService,
      this.appointmentCallTypesService,
      this.documentsService,
      this.invoicesService,
      this.invoiceItemsService,
      this.quoteItemTypesService,
      this.quotesService,
      this.quoteItemsService,
      this.quoteApplianceDetailsService,
      this.quoteProductDetailsService,
      this.quotePlanDetailsService,
      this.policiesService
    ]);
  }

  loadAll() {

    this.appointmentsService.getAll().pipe(
      tap(appointments => {

        for (const appointment of appointments) {
          this.loadAppointmentRelations(appointment);
        }

      })
    ).subscribe();


  }

  loadAppointmentRelations(appointment: Appointment) {

    console.log('loadAppointmentRelations', appointment);

    this.appointmentVisitsService.getWithQuery({
      appointmentId: `${appointment.id}`
    });

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

    this.invoicesService.getWithQuery({
      appointmentId: `${appointment.id}`
    }).pipe(first()).subscribe(invoices => {
      for (const invoice of invoices) {
        this.invoiceItemsService.getWithQuery({
          'invoiceId': `${invoice.id}`
        });
      }
    });

    this.quoteManagerService.loadAppointmentQuote(appointment.id).pipe(first()).subscribe();



  }
}
