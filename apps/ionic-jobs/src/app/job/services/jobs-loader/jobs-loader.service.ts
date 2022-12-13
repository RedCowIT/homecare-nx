import {Injectable} from "@angular/core";
import {filter, first, mergeMap, tap} from "rxjs/operators";
import {
  Appointment,
  asDateString, CustomerPlan,
  findById,
  joinEntityLoading,
  nowAsDateString,
  removeMissingFromCache
} from "@homecare/shared";
import {
  CustomerAddressesService,
  CustomerPlanAppliancesService,
  CustomerPlansService,
  CustomersService
} from "@homecare/customer";
import {AppointmentCallTypesService, AppointmentsService, AppointmentVisitsService} from "@homecare/appointment";
import {combineLatest, Observable} from "rxjs";
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
import {MergeStrategy} from "@ngrx/data";
import * as moment from "moment";
import {PlansService, PlanTypesService} from "@homecare/plan";


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
              private customerPlanAppliancesService: CustomerPlanAppliancesService,
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
              private quoteManagerService: QuoteManagerService,
              private planTypesService: PlanTypesService,
              private plansService: PlansService
  ) {
    this.loading$ = joinEntityLoading([
      this.appointmentsService,
      this.appointmentVisitsService,
      this.customersService,
      this.customerAddressesService,
      this.customerPlansService,
      this.customerPlanAppliancesService,
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

    const fromDate = nowAsDateString();
    const toDate = asDateString(moment().add(1, "day"));

    this.appointmentsService.getWithQuery({
      fromDate, toDate
    }).subscribe(appointments => {
    });

    combineLatest([this.appointmentsService.entities$, this.appointmentsService.getAll()]).pipe(
      first(),
      tap(([currentAppointments, newAppointments]) => {

        // Remove any not present in current payload
        for (const currentAppointment of currentAppointments) {
          if (!findById(newAppointments, currentAppointment.id)) {
            this.appointmentsService.removeOneFromCache(currentAppointment.id, {
              mergeStrategy: MergeStrategy.IgnoreChanges
            });
          }
        }

        for (const appointment of newAppointments) {
          this.loadAppointmentRelations(appointment);
        }

      })
    ).subscribe();


  }

  loadAppointmentRelations(appointment: Appointment) {
    this.appointmentVisitsService.getWithQuery({
      appointmentId: `${appointment.id}`
    });

    this.customersService.getByKey(appointment.customerId);

    this.customerAddressesService.getByKey(appointment.addressId);

    this.customerPlansService.getWithQuery({
      customerId: `${appointment.customerId}`
    }).pipe(
      first()
    ).subscribe(customerPlans => {

      removeMissingFromCache(this.customerPlansService, customerPlans, {key: 'customerId', value: appointment.customerId});

      this.loadCustomerPlanRelations(customerPlans);

    });

    this.appointmentCallTypesService.getWithQuery({
      appointmentId: `${appointment.id}`
    }).pipe(
      first()
    ).subscribe(appointmentCallTypes => {

      removeMissingFromCache(this.appointmentCallTypesService, appointmentCallTypes, {key: 'appointmentId', value: appointment.id});

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
        }).pipe(first()).subscribe(invoiceItems => {
          removeMissingFromCache(this.invoiceItemsService, invoiceItems, {key: 'invoiceId', value: invoice.id});
        });
      }
    });

    this.quoteManagerService.loadAppointmentQuote(appointment.id).pipe(first()).subscribe();


  }

  loadCustomerPlanRelations(customerPlans: CustomerPlan[]){
    if (!customerPlans?.length){
      return;
    }

    combineLatest([
      this.plansService.entityMap$,
      this.planTypesService.getApplianceRepairPlanType()
    ]).pipe(
      filter(([planMap, repairPlanType]) => {
        return !!repairPlanType;
      }),
      first()
    ).subscribe(([planMap, repairPlanType]) => {

      const appliancePlans = customerPlans.filter(customerPlan => {
        const plan = planMap[customerPlan.planId];
        return plan.planTypeId === repairPlanType.id
      });

      for (const appliancePlan of appliancePlans){
        this.customerPlanAppliancesService.getWithQuery({
          customerPlanId: `${appliancePlan.id}`
        });
      }

      console.log('APPLIANCE PLANS', appliancePlans);

    })



  }
}
