import {Component, OnInit} from '@angular/core';
import {StoreLogsComponent} from "../../main/main-components/store-logs/store-logs.component";
import {ModalController} from "@ionic/angular";
import {EntitySyncService} from "@homecare/entity";
import {CoreEntity} from "@homecare/core";

@Component({
  selector: 'hc-entity-sync-error-modal',
  templateUrl: './entity-sync-error-modal.component.html',
  styleUrls: ['./entity-sync-error-modal.component.scss']
})
export class EntitySyncErrorModalComponent implements OnInit {

  constructor(public modalCtrl: ModalController,
              public entityService: EntitySyncService) {
  }

  ngOnInit(): void {
  }

  async retry() {
    console.log('retry');
    await this.modalCtrl.dismiss();
    this.entityService.init(CoreEntity.AppDataId);
  }

  async openStoreLogs() {
    const modal = await this.modalCtrl.create({
      component: StoreLogsComponent,
      cssClass: 'fullscreen'
    });

    await modal.present();
  }
}
