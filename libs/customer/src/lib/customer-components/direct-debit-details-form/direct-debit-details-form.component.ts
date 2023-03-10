import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {DirectDebitDetails, selectEntityByKey, selectFirstEntityByKey} from "@homecare/shared";
import {DirectDebitDetailsService} from "../../store/entity/services/direct-debit-details/direct-debit-details.service";
import {DirectDebitDetailsFormService} from "../../services/form/direct-debit-details-form/direct-debit-details-form.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'hc-direct-debit-details-form',
  templateUrl: './direct-debit-details-form.component.html',
  styleUrls: ['./direct-debit-details-form.component.scss'],
  providers: [DirectDebitDetailsFormService]
})
export class DirectDebitDetailsFormComponent extends EntityFormContainer<DirectDebitDetails> implements OnInit {

  @Input()
  appointmentId: number;

  @Output()
  create = new EventEmitter<DirectDebitDetails>();

  constructor(public formService: DirectDebitDetailsFormService,
              public entityService: DirectDebitDetailsService) {
    super(formService, entityService);
  }

  ngOnInit(): void {

    super.ngOnInit();

    this.patchForm({
      appointmentId: this.appointmentId
    });

    selectFirstEntityByKey(this.entityService, 'appointmentId', this.appointmentId).pipe(
      first()
    ).subscribe(directDebitDetails => {
      if (directDebitDetails){
        this.patchForm({
          id: directDebitDetails.id,
          appointmentId: directDebitDetails.appointmentId,
          accountHolder: directDebitDetails.accountHolder,
          sortCode: directDebitDetails.sortCode,
          accountNumber: directDebitDetails.accountNumber
        });
      }
    });


  }

}
