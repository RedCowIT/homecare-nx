import {Injectable} from "@angular/core";
import {catchError, filter, first, map, mergeMap, tap} from "rxjs/operators";
import {
  Appointment,
  AppointmentVisit,
  firstByKey,
  firstItem, joinEntityLoading,
  QuoteItemTypes,
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
              private quotePlanDetailsService: QuotePlanDetailsService
  ) {
  }

  loadAll() {
    this.appointmentsService.getAll().pipe(
      tap(appointments => {

        for (const appointment of appointments) {
          this.loadAppointmentRelations(appointment);
        }

      })
    ).subscribe();

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

    // this.loading$ = combineLatest([
    //   this.appointmentsService.loading$,
    //   this.appointmentVisitsService.loading$,
    //   this.customersService.loading$,
    //   this.customerAddressesService.loading$,
    //   this.customerPlansService.loading$,
    //   this.appointmentCallTypesService.loading$,
    //   this.documentsService.loading$,
    //   this.invoicesService.loading$,
    //   this.invoiceItemsService.loading$,
    //   this.quoteItemTypesService.loading$,
    //   this.quotesService.loading$,
    //   this.quoteItemsService.loading$,
    //   this.quoteApplianceDetailsService.loading$,
    //   this.quoteProductDetailsService.loading$,
    //   this.quotePlanDetailsService.loading$,
    //   this.policiesService.loading$,
    // ]).pipe(
    //   map(([
    //          appointmentsLoading,
    //          appointmentVisitsLoading,
    //          customersLoading,
    //          customerAddressesLoading,
    //          customerPlansLoading,
    //          appointmentCallTypesLoading,
    //          documentsLoading,
    //          invoicesLoading,
    //          invoiceItemsLoading,
    //          quoteItemTypesLoading,
    //          quotesLoading,
    //          quoteItemsLoading,
    //          quoteApplianceDetailsLoading,
    //          quoteProductDetailsLoading,
    //          quotePlanDetailsLoading,
    //          policiesLoading
    //        ]) => {
    //
    //     return appointmentsLoading ||
    //       appointmentVisitsLoading ||
    //       customersLoading ||
    //       customerAddressesLoading ||
    //       customerPlansLoading ||
    //       appointmentCallTypesLoading ||
    //       documentsLoading ||
    //       invoicesLoading ||
    //       invoiceItemsLoading ||
    //       quoteItemTypesLoading ||
    //       quotesLoading ||
    //       quoteItemsLoading ||
    //       quoteApplianceDetailsLoading ||
    //       quoteProductDetailsLoading ||
    //       quotePlanDetailsLoading ||
    //       policiesLoading;
    //   })
    // );
  }

  loadAppointmentRelations(appointment: Appointment) {

    selectOrFetchFirstEntityByKey(this.appointmentVisitsService, 'appointmentId', appointment.id).pipe(
      first()
    ).subscribe(visit => {
      if (!visit) {
        this.appointmentVisitsService.add({
          id: appointment.id
        } as AppointmentVisit);
      }
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

    this.quoteItemTypesService.entities$
      .pipe(
        filter(quoteItemTypes => quoteItemTypes?.length > 0),
        mergeMap(quoteItemTypes => {
          const quotes$ = this.quotesService.getWithQuery({
            appointmentId: `${appointment.id}`
          });
          return forkJoin([of(quoteItemTypes), quotes$]);
        }),
        mergeMap(([quoteItemTypes, quotes]) => {
          const quote = firstItem(quotes);
          if (!quote) {
            return forkJoin([of(quoteItemTypes), of([])]);
          }
          const quoteItems$ = this.quoteItemsService.getWithQuery({
            quoteId: `${quote.id}`
          });
          return forkJoin([of(quoteItemTypes), quoteItems$]);
        }),
        mergeMap(([quoteItemTypes, quoteItems]) => {

          const quoteItemDetails = [];
          for (const quoteItem of quoteItems) {

            const quoteItemType = firstByKey(quoteItemTypes, 'id', quoteItem.quoteItemTypeId);
            if (!quoteItemType){
              throw new Error('Missing quote item type with id: ' + quoteItem.quoteItemTypeId);
            }
            console.log('Found quoteItem', quoteItem, quoteItemType);

            switch (quoteItemType.description){
              case QuoteItemTypes.Appliance:
                quoteItemDetails.push(this.quoteApplianceDetailsService.getWithQuery({
                  quoteItemId: `${quoteItem.id}`
                }));
                break;
              case QuoteItemTypes.Product:
                quoteItemDetails.push(this.quoteProductDetailsService.getWithQuery({
                  quoteItemId: `${quoteItem.id}`
                }));
                break;
              case QuoteItemTypes.Plan:
                quoteItemDetails.push(this.quotePlanDetailsService.getWithQuery({
                  quoteItemId: `${quoteItem.id}`
                }));
                break;
            }
          }
          return forkJoin(quoteItemDetails);
        }),
        first(),
        catchError(error => {
          console.error('Quotes failed to load.')
          return throwError(error);
        })
      ).subscribe();

    this.policiesService.getWithQuery({
      customerId: `${appointment.customerId}`
    });

  }
}
