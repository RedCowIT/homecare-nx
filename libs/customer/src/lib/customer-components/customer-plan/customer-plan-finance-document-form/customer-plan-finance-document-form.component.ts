import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {asDateString, CustomerPlanFinanceDocument, nowAsDateString, selectEntity} from "@homecare/shared";
import {CustomerPlanFinanceDocumentFormService} from "../../../services/form/customer-plan-finance-document-form/customer-plan-finance-document-form.service";
import {CustomerPlanFinanceDocumentsService} from "../../../store/entity/services/customer-plan-finance-documents/customer-plan-finance-documents.service";
import * as moment from 'moment';
import {combineLatest, Observable} from "rxjs";
import {filter, first, mergeMap, takeUntil} from "rxjs/operators";
import {CustomerPlansService} from "../../../store/entity/services/customer-plans/customer-plans.service";
import {CustomersService} from "../../../store/entity/services/customers/customers.service";
import {SignaturePadComponent} from "../../../../../../ionic-common/src/lib/signature-pad/signature-pad.component";

@Component({
  selector: 'hc-customer-plan-finance-document-form',
  templateUrl: './customer-plan-finance-document-form.component.html',
  styleUrls: ['./customer-plan-finance-document-form.component.scss'],
  providers: [
    CustomerPlanFinanceDocumentFormService
  ]
})
export class CustomerPlanFinanceDocumentFormComponent extends EntityFormContainer<CustomerPlanFinanceDocument> implements OnInit, AfterViewInit {

  @Input()
  id: number;

  @Output()
  create = new EventEmitter<CustomerPlanFinanceDocument>();

  @Output()
  update = new EventEmitter<CustomerPlanFinanceDocument>();

  @Output()
  delete = new EventEmitter<CustomerPlanFinanceDocument>();

  @ViewChild(SignaturePadComponent)
  signaturePadComponent: SignaturePadComponent;

  maxDate: string;

  showError = false;


  constructor(public formService: CustomerPlanFinanceDocumentFormService,
              public entityService: CustomerPlanFinanceDocumentsService,
              public customerPlansService: CustomerPlansService,
              public customersService: CustomersService,
              public cdRef: ChangeDetectorRef) {

    super(formService, entityService);

    this.maxDate = asDateString(moment().subtract(18, 'years'));

  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.isEditMode()) {
      combineLatest([this.model$, this.customerPlansService.entityMap$, this.customersService.entityMap$]).pipe(
        filter(([model, customerPlanMap, customerMap]) => !!model && !!customerPlanMap[model.customerPlanId]),
        first(),
        takeUntil(this.destroyed$)
      ).subscribe(([model, customerPlanMap, customerMap]) => {


        const customerPlan = customerPlanMap[model.customerPlanId];
        const customer = customerMap[customerPlan.customerId];



        this.patchForm({
          email1: customer.email1,
          email2: customer.email2,
          phone1: customer.phone1,
          phone2: customer.phone2,
        });
      });
    }
  }

  ngAfterViewInit() {
    this.model$.pipe(first()).subscribe(
      (doc: CustomerPlanFinanceDocument) => {

        if (doc.signatureBase64) {
          this.signaturePadComponent.fromDataURL(doc.signatureBase64);
        }
      }
    )
  }

  updateSignature(data) {



    this.entityService.updateOneInCache({
      id: this.id,
      signatureBase64: data,
      signatureDate: nowAsDateString()
    });

    this.patchForm({
      signatureBase64: data,
      signatureDate: nowAsDateString()
    });

    if (data) {
      this.showError = false;
    }

    this.cdRef.detectChanges();
  }

  /**
   * Merge with existing model before submitting
   * @param model
   * @protected
   */
  protected doUpdate(model: Partial<CustomerPlanFinanceDocument>): Observable<CustomerPlanFinanceDocument> {

    return selectEntity(this.entityService, this.id).pipe(
      first(),
      mergeMap(doc => {

        if (model.dob) {
          model.dob = moment(model.dob).format('YYYY-MM-DD');
        }

        // Prefer false to null
        if (!model.currentAddressLessThanThree) {
          model.currentAddressLessThanThree = false;
        }

        const updateModel = {
          ...doc,
          ...model
        };

        delete updateModel['signatureIPAddress'];
        delete updateModel['createdBy'];
        delete updateModel['created'];
        delete updateModel['modifiedBy'];
        delete updateModel['modified'];

        return this.entityService.update(updateModel);

      })
    );


  }
}
