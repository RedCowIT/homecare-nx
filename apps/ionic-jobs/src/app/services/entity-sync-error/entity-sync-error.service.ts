import {Injectable} from '@angular/core';
import {EntitySyncService} from "@homecare/entity";
import {ModalController} from "@ionic/angular";
import {EntitySyncErrorModalComponent} from "../../components/entity-sync-error-modal/entity-sync-error-modal.component";

/**
 * Registers NGRX metadata before anything else
 */
@Injectable({
  providedIn: 'root'
})
export class EntitySyncErrorService {

  constructor(private entitySyncService: EntitySyncService,
              private modalCtrl: ModalController) {

  }

  async handleError(error) {

    console.log('ENTITY SYNC ERROR', error);

    if (error?.status !== 401){
      const modal = await this.modalCtrl.create({
        component: EntitySyncErrorModalComponent,
        backdropDismiss: false
      });

      await modal.present();
    }


  }
}
