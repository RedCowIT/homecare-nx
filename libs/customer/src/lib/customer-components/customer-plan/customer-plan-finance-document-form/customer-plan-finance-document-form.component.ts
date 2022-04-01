import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {asDateString, CustomerPlanFinanceDocument, nowAsDateString, selectEntity} from "@homecare/shared";
import {CustomerPlanFinanceDocumentFormService} from "../../../services/form/customer-plan-finance-document-form/customer-plan-finance-document-form.service";
import {CustomerPlanFinanceDocumentsService} from "../../../store/entity/services/customer-plan-finance-documents/customer-plan-finance-documents.service";
import * as moment from 'moment';
import {Observable} from "rxjs";
import {first, mergeMap} from "rxjs/operators";

@Component({
  selector: 'hc-customer-plan-finance-document-form',
  templateUrl: './customer-plan-finance-document-form.component.html',
  styleUrls: ['./customer-plan-finance-document-form.component.scss'],
  providers: [
    CustomerPlanFinanceDocumentFormService
  ]
})
export class CustomerPlanFinanceDocumentFormComponent extends EntityFormContainer<CustomerPlanFinanceDocument> implements OnInit {

  @Input()
  id: number;

  @Output()
  create = new EventEmitter<CustomerPlanFinanceDocument>();

  @Output()
  update = new EventEmitter<CustomerPlanFinanceDocument>();

  @Output()
  delete = new EventEmitter<CustomerPlanFinanceDocument>();

  maxDate: string;

  showError = false;

  constructor(public formService: CustomerPlanFinanceDocumentFormService,
              public entityService: CustomerPlanFinanceDocumentsService,
              public cdRef: ChangeDetectorRef) {

    super(formService, entityService);

    this.maxDate = asDateString(moment().subtract(18, 'years'));

  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  updateSignature(data) {

    console.log('updateSignature', data);

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

        if (model.dob){
          model.dob = moment(model.dob).format('YYYY-MM-DD');
        }

        // Prefer false to null
        if (!model.currentAddressLessThanThree){
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
