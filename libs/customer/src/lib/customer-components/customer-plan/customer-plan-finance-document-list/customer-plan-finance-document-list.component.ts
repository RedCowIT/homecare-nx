import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CustomerPlanFinanceDocument} from "@homecare/shared";
import {CustomerPlanManagerService} from "../../../services/customer-plan-manager/customer-plan-manager.service";

;

@Component({
  selector: 'hc-customer-plan-finance-document-list',
  templateUrl: './customer-plan-finance-document-list.component.html',
  styleUrls: ['./customer-plan-finance-document-list.component.scss']
})
export class CustomerPlanFinanceDocumentListComponent implements OnInit {

  @Input()
  appointmentId: number;

  docs$: Observable<CustomerPlanFinanceDocument[]>;

  constructor(public customerPlanManagerService: CustomerPlanManagerService) {
  }

  ngOnInit(): void {
    this.docs$ = this.customerPlanManagerService.appointmentFinanceDocs(this.appointmentId);
  }

}
