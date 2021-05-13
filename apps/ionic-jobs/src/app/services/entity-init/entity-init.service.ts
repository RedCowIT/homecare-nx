import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppInitHandler} from '@homecare/shared';
import {EntityDefinitionService} from "@ngrx/data";
import {AppointmentEntity, appointmentEntityMetadata} from "@homecare/appointment";
import {EntitySyncService} from "@homecare/entity";
import {appDataIdEntityMetadata} from "@homecare/core";

/**
 * Registers NGRX metadata before anything else
 */
@Injectable({
  providedIn: 'root'
})
export class EntityInitService implements AppInitHandler {

  /**
   * All application entity meta data
   */
  static readonly entityMetadata = [
    appDataIdEntityMetadata,
    appointmentEntityMetadata
  ];

  /**
   * Entities we need to sync for working offline.
   */
  static readonly syncEntities = [
    AppointmentEntity.AppointmentNoAnswerReason,
    AppointmentEntity.CallTypeClass,
    AppointmentEntity.CallType,
    AppointmentEntity.AppointmentStatus
  ];

  constructor(private entityDefinitionService: EntityDefinitionService,
              private entitySyncService: EntitySyncService) {

    for (const metadata of EntityInitService.entityMetadata) {
      this.entityDefinitionService.registerMetadataMap(metadata);
    }

  }

  init(): void {

    for (const entityName of EntityInitService.syncEntities) {
      this.entitySyncService.registerEntity(entityName);
    }

  }

  waitUntilInitialized(): Observable<any> {

    return of(true);

  }

}
