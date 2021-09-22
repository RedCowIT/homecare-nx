import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {selectEntity} from "@homecare/shared";
import {first} from "rxjs/operators";
import {PlanTypesService} from "@homecare/plan";

@Component({
  selector: 'hc-quote-plan-detail-modal',
  templateUrl: './quote-plan-detail-modal.component.html',
  styleUrls: ['./quote-plan-detail-modal.component.scss']
})
export class QuotePlanDetailModalComponent implements OnInit {

  @Input()
  planTypeId: number;

  @Input()
  quoteId: number;

  @Input()
  quotePlanDetailId: number;

  title: string;

  constructor(public planTypesService: PlanTypesService, private modalCtrl: ModalController) { }

  ngOnInit(): void {
    selectEntity(this.planTypesService, this.planTypeId).pipe(first()).subscribe(
      planType => {
        this.title = planType.description
      }
    );
  }

  async close(){
    await this.modalCtrl.dismiss();
  }

}
