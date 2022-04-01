import {Inject, Injectable} from "@angular/core";
import {StorageService} from "@homecare/storage";
import {CacheStoreService} from "@homecare/storage";
import {EntityCacheItem} from "../../models/entity-cache-item";
import {Observable, of} from "rxjs";
import {ENTITY_CACHE_ENABLED} from '../../tokens/entity.config';

@Injectable()
export class EntityCacheService {

  constructor(private storage: StorageService,
              private cacheStoreService: CacheStoreService,
              @Inject(ENTITY_CACHE_ENABLED) private isEnabled) {
    console.log('EntityCacheService()', this.isEnabled);
  }

  public static createEntityCacheItem(payloadId: string, entityData: Array<{ entityName: string, entities: unknown[] }>): EntityCacheItem {
    return {
      payloadId, data: entityData
    }
  }

  save(key: string, entityCacheItem: EntityCacheItem) {
    if (!this.isEnabled) {
      return;
    }

    this.cacheStoreService.set(key, entityCacheItem)
  }

  get(key: string): Observable<EntityCacheItem> {
    if (!this.isEnabled) {
      return of(null);
    }
    return this.cacheStoreService.get<EntityCacheItem>(key);
  }

}
