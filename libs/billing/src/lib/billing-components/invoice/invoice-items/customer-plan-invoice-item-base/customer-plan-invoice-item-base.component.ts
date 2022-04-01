import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  catchHttpValidationErrors,
  CustomerPlan,
  InvoiceItem,
  Plan,
  selectEntity, selectFirstEntityByKey,
  SubscribedContainer
} from "@homecare/shared";
import {combineLatest, Observable} from "rxjs";
import {PlansService} from "@homecare/plan";
import {CustomerPlansService} from "@homecare/customer";
import {InvoiceItemsService} from "../../../../store/entity/services/invoice/invoice-items/invoice-items.service";
import {finalize, first, map, mergeMap, takeUntil, tap} from "rxjs/operators";
import {EntityFormService} from "@homecare/entity";
import {FormGroup} from "@angular/forms";
import {InvoicesService} from "../../../../store/entity/services/invoice/invoices/invoices.service";

@Component({
  selector: 'hc-customer-plan-invoice-item-base',
  templateUrl: './customer-plan-invoice-item-base.component.html',
  styleUrls: ['./customer-plan-invoice-item-base.component.scss']
})
export class CustomerPlanInvoiceItemBaseComponent extends SubscribedContainer implements OnInit {

  @Input()
  invoiceId: number;

  @Input()
  invoiceItemId: number;

  @Input()
  invoiceItemTypeId: number;

  @Input()
  planTypes: number[];

  @Output()
  done = new EventEmitter<void>();

  plans$: Observable<Plan[]> | null;

  isLoading = false;

  isLoading$: Observable<boolean> | null;

  errors: string[];

  deleting = false;

  constructor(public plansService: PlansService,
              public customerPlansService: CustomerPlansService,
              public invoicesService: InvoicesService,
              public invoiceItemsService: InvoiceItemsService) {
    super();
  }

  /**
   * default implementation
   */
  protected initLoading() {
    this.isLoading$ = combineLatest([this.customerPlansService.loading$, this.invoiceItemsService.loading$])
      .pipe(
        map(([plansLoading, invoiceItemsLoading]) => plansLoading || invoiceItemsLoading)
      );
  }

  protected getFormService(): EntityFormService {
    throw new Error('Missing concrete implementation');
  }

  protected getForm(): FormGroup {
    return this.getFormService().form;
  }

  protected patchForm() {

    this.getFormService().form.patchValue({
      'invoiceItem': {id: this.invoiceItemId, invoiceId: this.invoiceId, invoiceItemTypeId: this.invoiceItemTypeId},
      'customerPlan': {invoiceId: this.invoiceId, invoiceItemId: this.invoiceItemId},
    });

    selectEntity(this.invoicesService, this.invoiceId).pipe(first()).subscribe((invoice) => {
      this.getFormService().form.patchValue({
        'customerPlan': {appointmentId: invoice.appointmentId},
      });
    });

    if (this.invoiceItemId) {
      selectEntity(this.invoiceItemsService, this.invoiceItemId).pipe(first()).subscribe(
        invoiceItem => {
          this.getFormService().form.patchValue({
            'invoiceItem': {
              invoiceItemTypeId: invoiceItem.invoiceItemTypeId,
              productId: invoiceItem.productId,
              productCode: invoiceItem.productCode,
              qty: invoiceItem.qty,
              unitPrice: invoiceItem.unitPrice
            }
          });
        }
      );

      selectFirstEntityByKey(this.customerPlansService, 'invoiceItemId', this.invoiceItemId).pipe(first()).subscribe(
        customerPlan => {
          console.log('Setting customer plan', customerPlan);
          if (customerPlan) {
            this.getFormService().form.patchValue({
              'customerPlan': customerPlan
            });
          } else {
            console.warn('Orphan invoice item of plan type without a customer plan object');
          }
        }
      );

    }


  }

  protected registerFormListeners() {

    // listen for changes on planId and set related invoiceItem.productId = plan.productId

    this.getForm().get('customerPlan.planId').valueChanges.pipe(
      mergeMap(planId => selectEntity(this.plansService, planId)),
      takeUntil(this.destroyed$)
    ).subscribe((plan: Plan) => {
      console.log('plan id changed', plan);
      this.getForm().patchValue({'invoiceItem': {productId: plan.productId}});
    });

  }

  ngOnInit(): void {

    this.initLoading();

    this.isLoading$.pipe(takeUntil(this.destroyed$)).subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.patchForm();

    this.registerFormListeners();

    this.plans$ = this.plansService.entities$.pipe(map(plans => {
      return plans.filter(plan => {
        return this.planTypes.includes(plan.planTypeId);
      })
    }));

  }

  /**
   * Save Invoice Item > CustomerPlan
   */
  save() {

    if (!this.getForm().valid) {
      console.log('invalid form', this.getFormService().createDTO());
      return;
    }

    // this.invoiceItemsService.dto.invoiceItem
    if (this.invoiceItemId) {
      this.doUpdate();
    } else {
      this.doCreate();
    }
  }

  /**
   * Plans have zero unit price. The plan itself has a period price in separate model.
   * @protected
   */
  protected createInvoiceItem(): Observable<InvoiceItem> {
    const dto = this.getFormService().createDTO() as any;
    dto.invoiceItem.unitPrice = 0;
    return this.invoiceItemsService.add(dto.invoiceItem as InvoiceItem).pipe(tap(
      invoiceItem => {
        this.getFormService().form.patchValue({
          'invoiceItem': {id: invoiceItem.id},
          'customerPlan': {invoiceItemId: invoiceItem.id}
        });
      }
    ));

  }

  protected createCustomerPlan(): Observable<CustomerPlan> {

    return selectEntity(this.invoicesService, this.invoiceId).pipe(
      first(),
      mergeMap(invoice => {

        if (!invoice) {
          throw new Error('Missing invoice: ' + this.invoiceId);
        }

        const dto = this.getFormService().createDTO() as any;
        dto.customerPlan.customerId = invoice.customerId;

        return this.customerPlansService.add(dto.customerPlan as CustomerPlan);
      })
    );

  }

  protected doCreate() {
    this.createInvoiceItem().pipe(
      mergeMap(invoiceItem => {
        return this.createCustomerPlan();
      }),
      catchHttpValidationErrors(errors => {
        console.log('errors', errors);
        this.errors = errors;
      }),
      first()
    ).subscribe((c) => {
      this.done.emit();
    });
  }

  protected doUpdate() {

    const dto = this.getFormService().createDTO() as any;
    this.invoiceItemsService.update(dto.invoiceItem as InvoiceItem).pipe(
      mergeMap(() => {
        return this.customerPlansService.update(dto.customerPlan as CustomerPlan);
      }),
      catchHttpValidationErrors(errors => {
        console.log('errors', errors);
        this.errors = errors;
      })
    ).subscribe(() => {
      this.done.emit();
    });

  }

  delete() {
    if (this.deleting) {
      return;
    }
    this.deleting = true;
    this.invoiceItemsService.delete(this.invoiceItemId).pipe(first(), finalize(() => {
      this.deleting = true;
    })).subscribe(() => {
      this.done.emit();
    });
  }
}
