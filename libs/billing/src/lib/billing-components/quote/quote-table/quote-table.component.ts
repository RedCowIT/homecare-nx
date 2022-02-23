import {AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {QuoteTableService} from "../../../services/quote/quote-table/quote-table.service";
import {QuoteItemsService} from "../../../store/entity/services/quote/quote-items/quote-items.service";
import {
  firstItem,
  QuoteApplianceDetail,
  QuoteItem,
  QuoteItemTypes,
  selectEntity,
  selectEntityByKey
} from "@homecare/shared";
import {first} from "rxjs/operators";
import {combineLatest} from "rxjs";
import {QuoteApplianceDetailsService} from "../../../store/entity/services/quote/quote-appliance-details/quote-appliance-details.service";
import {QuoteItemTypesService} from "../../../store/entity/services/quote/quote-item-types/quote-item-types.service";
import {QuoteApplianceDetailModalComponent} from "../quote-appliance-detail-modal/quote-appliance-detail-modal.component";
import {QuoteSummaryService} from "../../../services/quote/quote-summary/quote-summary.service";

@Component({
  selector: 'hc-quote-table',
  templateUrl: './quote-table.component.html',
  styleUrls: ['./quote-table.component.scss'],
  providers: [QuoteTableService, QuoteSummaryService]
})
export class QuoteTableComponent implements OnInit, AfterViewInit {

  @Input()
  quoteId: number;

  @ViewChild('valueTemplate') valueTmpl: TemplateRef<any> | undefined;

  constructor(public quoteTableService: QuoteTableService,
              private modalCtrl: ModalController,
              private quoteItemsService: QuoteItemsService,
              private quoteItemTypesService: QuoteItemTypesService,
              private quoteApplianceDetailsService: QuoteApplianceDetailsService,
              public quoteSummaryService: QuoteSummaryService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.quoteTableService.init(this.quoteId, {value:this.valueTmpl});
    this.quoteTableService.load();
    this.quoteSummaryService.init(this.quoteId);
  }

  async select(row) {
    await this.openModal(row[0].id);
  }

  async openModal(quoteItemId: number) {

    combineLatest([
      selectEntity(this.quoteItemsService, quoteItemId),
      this.quoteItemTypesService.entityMap$
    ]).pipe(
      first()
    ).subscribe(([quoteItem, quoteItemTypeMap]) => {
      const quoteItemType = quoteItemTypeMap[quoteItem.quoteItemTypeId];

      switch (quoteItemType.description) {
        case QuoteItemTypes.Appliance:
          this.openApplianceModal(quoteItem);
          break;
        case QuoteItemTypes.Product:

          break;
        case QuoteItemTypes.Plan:

          break;
      }

    });

  }

  openApplianceModal(quoteItem: QuoteItem) {

    selectEntityByKey(this.quoteApplianceDetailsService, 'quoteItemId', quoteItem.id).pipe(first())
      .subscribe(async (quoteApplianceDetails: QuoteApplianceDetail[]) => {

          const componentProps: any = {
            applianceTypeId: firstItem(quoteApplianceDetails).applianceTypeId,
            quoteId: this.quoteId,
            quoteApplianceDetailId: firstItem(quoteApplianceDetails).id
          };

          const modal = await this.modalCtrl.create({
            component: QuoteApplianceDetailModalComponent,
            componentProps
          });

          await modal.present();
        }
      );

  }
}
