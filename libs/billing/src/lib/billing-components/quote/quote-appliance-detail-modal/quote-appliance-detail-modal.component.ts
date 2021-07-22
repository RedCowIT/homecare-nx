import {Component, Input, OnInit} from '@angular/core';
import {ApplianceTypesService} from "@homecare/product";
import {selectEntity} from "@homecare/shared";
import {first} from "rxjs/operators";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'hc-quote-appliance-detail-modal',
  templateUrl: './quote-appliance-detail-modal.component.html',
  styleUrls: ['./quote-appliance-detail-modal.component.scss']
})
export class QuoteApplianceDetailModalComponent implements OnInit {

  @Input()
  quoteApplianceDetailId: number;

  @Input()
  applianceTypeId: number;

  @Input()
  quoteId: number;

  title: string;

  constructor(public applianceTypesService: ApplianceTypesService, private modalCtrl: ModalController) { }

  ngOnInit(): void {
    selectEntity(this.applianceTypesService, this.applianceTypeId).pipe(first()).subscribe(
      applianceType => {
        this.title = applianceType.description
      }
    );
  }

  async close(){
    await this.modalCtrl.dismiss();
  }
}
