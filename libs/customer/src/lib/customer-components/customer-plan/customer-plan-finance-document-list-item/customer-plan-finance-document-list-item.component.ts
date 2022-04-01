import {Component, Input, OnInit} from '@angular/core';
import {CustomerPlanFinanceDocument, EntityContainer, isValidCustomerPlanFinanceDocument} from "@homecare/shared";
import {CustomerPlanFinanceDocumentsService} from "../../../store/entity/services/customer-plan-finance-documents/customer-plan-finance-documents.service";
import {first} from "rxjs/operators";
import {ModalController} from "@ionic/angular";
import {CustomerPlanFinanceDocumentModalComponent} from "../customer-plan-finance-document-modal/customer-plan-finance-document-modal.component";

@Component({
  selector: 'hc-customer-plan-finance-document-list-item',
  templateUrl: './customer-plan-finance-document-list-item.component.html',
  styleUrls: ['./customer-plan-finance-document-list-item.component.scss']
})
export class CustomerPlanFinanceDocumentListItemComponent extends EntityContainer<CustomerPlanFinanceDocument> implements OnInit {

  @Input()
  id: number;

  constructor(public entityService: CustomerPlanFinanceDocumentsService,
              public modalCtrl: ModalController) {
    super(entityService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    // this.model$.pipe(
    //   first()
    // ).subscribe(doc => {
    //
    // });
  }

  isValid(doc: CustomerPlanFinanceDocument): boolean {
    return isValidCustomerPlanFinanceDocument(doc);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CustomerPlanFinanceDocumentModalComponent,
      componentProps: {
        id: this.id
      },
      cssClass: 'fullscreen'
    });

    await modal.present();
  }
}
