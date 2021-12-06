import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SelectOption} from "@homecare/common";
import {InvoiceItemTypesService} from "../../../store/entity/services/invoice/invoice-item-types/invoice-item-types.service";
import {ModalController, PopoverController} from "@ionic/angular";
import {PopoverSelectComponent} from "../../../../../../ionic-common/src/lib/components/popover-select/popover-select.component";
import {InvoiceItemModalComponent} from "../invoice-item-modal/invoice-item-modal.component";
import {InvoiceItemTypes} from "@homecare/shared";
import {InvoiceTableComponent} from "../invoice-table/invoice-table.component";

@Component({
  selector: 'hc-add-invoice-item-button',
  templateUrl: './add-invoice-item-button.component.html',
  styleUrls: ['./add-invoice-item-button.component.scss']
})
export class AddInvoiceItemButtonComponent implements OnInit {

  @Input()
  invoiceId: number;

  @Output()
  update = new EventEmitter<void>();

  invoiceItemOptions: SelectOption[] = [
    {
      label: 'Service', value: InvoiceItemTypes.Service
    },
    {
      label: 'Service Plan', value: InvoiceItemTypes.ServicePlan
    },
    {
      label: 'Repair Plan', value: InvoiceItemTypes.RepairPlan
    },
    {
      label: 'All Products', value: InvoiceItemTypes.Misc
    }
  ];

  constructor(public popoverCtrl: PopoverController,
              public invoiceItemTypesService: InvoiceItemTypesService,
              public modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    // this.invoiceItemOptions$ = this.invoiceItemTypesService.entities$.pipe(
    //   map(invoiceItemTypes => {
    //     return  [
    //       {
    //         label:
    //       }
    //     ]
    //   })
    // )
  }

  async openInvoiceItemMenu($event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverSelectComponent,
      componentProps: {
        options: this.invoiceItemOptions
      },
      event: $event
    });

    popover.onWillDismiss().then(
      (data: any) => {
        console.log('onWillDismiss', data.data);
        this.openModal(data.data.option);
      }
    );

    await popover.present();
  }

  async openModal(option: SelectOption) {
    console.log('Selected', option);
    const modal = await this.modalCtrl.create({
      component: InvoiceItemModalComponent,
      componentProps: {
        invoiceId: this.invoiceId,
        type: option.value
      }
    });

    modal.onWillDismiss().then(
      (data: any) => {
        this.update.emit();
      }
    );

    await modal.present();

  }

}
