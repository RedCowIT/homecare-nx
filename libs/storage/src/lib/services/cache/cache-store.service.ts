import {Store} from "@ngrx/store";
import {
  flushCacheStore,
  initCacheStore,
  removeCacheStoreItem,
  setCacheStoreItem
} from "../../store/actions/cache-store.actions";
import {from, Observable} from "rxjs";
import {selectCacheStoreKeys} from "../../store/selectors/cache-store.selectors";
import {CacheItem} from "../../models/cache-item";
import {map} from "rxjs/operators";
import {StorageService} from "@homecare/storage";

export class CacheStoreService {

  readonly keys$: Observable<string[]>;

  constructor(private store: Store, private storageService: StorageService) {
    this.keys$ = this.store.select(selectCacheStoreKeys);
  }

  init() {
    this.store.dispatch(initCacheStore());
  }

  flush() {
    this.store.dispatch(flushCacheStore());
  }

  remove(key: string) {
    this.store.dispatch(removeCacheStoreItem({key}))
  }

  set(key: string, data: unknown) {
    this.store.dispatch(setCacheStoreItem({
      key, data
    }));
  }

  /**
   * TODO: expiry policy.
   *
   * @param key
   */
  get<T>(key: string): Observable<T> {

    return this.storageService.get<CacheItem>(key).pipe(
      map((cacheItem: CacheItem) => {
        return cacheItem?.data as T;
      })
    )

  }

  createCacheItem(data: any): CacheItem {
    return {
      version: '1',
      createdAt: new Date().toISOString(),
      data
    }
  }
}
