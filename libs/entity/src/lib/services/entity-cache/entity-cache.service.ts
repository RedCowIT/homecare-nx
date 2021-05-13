import {Injectable} from "@angular/core";
import {StorageService} from "@homecare/storage";
import {CacheStoreService} from "../../../../../storage/src/lib/services/cache/cache-store.service";
import {CacheItem} from "../../../../../storage/src/lib/models/cache-item";
import {EntityCacheItem} from "../../models/entity-cache-item";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";



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

  public static createEntityCacheItem(payloadId: string, data: unknown): EntityCacheItem {
    return {
      payloadId, data
    }
  }

  save(key: string, entityCacheItem: EntityCacheItem) {
    this.cacheStoreService.set(key, entityCacheItem)
  }

  get(key: string): Observable<EntityCacheItem> {
    return this.cacheStoreService.get<CacheItem>(key).pipe(
      map(cacheItem => {
        if (!cacheItem){
          return null;
        }
        return cacheItem.data as EntityCacheItem;
      })
    )
  }

}
