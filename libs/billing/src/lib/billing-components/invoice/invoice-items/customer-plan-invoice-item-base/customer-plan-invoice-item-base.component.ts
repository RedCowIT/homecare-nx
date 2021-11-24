import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  catchHttpValidationErrors,
  CustomerPlan,
  InvoiceItem,
  Plan,
  selectEntity,
  SubscribedContainer
} from "@homecare/shared";
import {combineLatest, Observable} from "rxjs";
import {PlansService} from "@homecare/plan";
import {CustomerPlansService} from "@homecare/customer";
import {InvoiceItemsService} from "../../../../store/entity/services/invoice/invoice-items/invoice-items.service";
import {first, map, mergeMap, takeUntil, tap} from "rxjs/operators";
import {EntityFormService} from "@homecare/entity";
import {FormGroup} from "@angular/forms";

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

  constructor(public plansService: PlansService,
                        public customerPlansService: CustomerPlansService,
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
      'invoiceItem': {id: this.invoiceItemId, invoiceId: this.invoiceId},
      'customerPlan': {invoiceId: this.invoiceId, invoiceItemId: this.invoiceItemId},
    });

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

    // TODO: patch invoiceItem and customerPlan if edit mode

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

  protected createInvoiceItem(): Observable<InvoiceItem> {
    const dto = this.getFormService().createDTO() as any;
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
    const dto = this.getFormService().createDTO() as any;
    return this.customerPlansService.add(dto.customerPlan as CustomerPlan);
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

  }
}
