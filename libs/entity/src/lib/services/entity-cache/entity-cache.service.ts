import {Injectable} from "@angular/core";
import {StorageService} from "@homecare/storage";
import {CacheStoreService} from "../../../../../storage/src/lib/services/cache/cache-store.service";
import {EntityCacheItem} from "../../models/entity-cache-item";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EntityCacheService {

  constructor(private storage: StorageService,
              private cacheStoreService: CacheStoreService) {

  }

  //
  // snapshot(cacheBlockKey: string, entityNames: []){
  //
  // }

  public static createEntityCacheItem(payloadId: string, entityData: Array<{entityName: string, entities: unknown[]}>): EntityCacheItem {
    return {
      payloadId, data: entityData
    }
  }

  save(key: string, entityCacheItem: EntityCacheItem) {
    this.cacheStoreService.set(key, entityCacheItem)
  }

  get(key: string): Observable<EntityCacheItem> {
    return this.cacheStoreService.get<EntityCacheItem>(key);
  }

}
