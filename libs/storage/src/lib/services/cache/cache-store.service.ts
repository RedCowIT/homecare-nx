import {Store} from "@ngrx/store";
import {
  flushCacheStore,
  initCacheStore,
  removeCacheStoreItem,
  setCacheStoreItem
} from "../../store/actions/cache-store.actions";
import {from, Observable} from "rxjs";
import {ClientStorage} from "../storage/client-storage";
import {selectCacheStoreKeys} from "../../store/selectors/cache-store.selectors";

export class CacheStoreService {

  readonly keys$: Observable<string[]>;

  constructor(private store: Store, private clientStorage: ClientStorage) {
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

  get<T>(key: string): Observable<T> {
    console.log(this.clientStorage);
    return from(this.clientStorage.get(key));
  }
}
