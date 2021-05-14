import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {setCacheStoreItem, setCacheStoreItemError, setCacheStoreItemSuccess} from "../actions/cache-store.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {from, of} from "rxjs";
import {CacheStoreService} from "../../services/cache/cache-store.service";
import {StorageService} from "../../services/storage/storage.service";


@Injectable()
export class CacheStoreEffects {

  setCacheStoreItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setCacheStoreItem),
      switchMap(action => {

        return from(this.storageService.set(action.key, this.cacheStoreService.createCacheItem(action.data))).pipe(
          map(() => setCacheStoreItemSuccess({key: action.key})),
          catchError(error => {
            return of(setCacheStoreItemError({error}))
          })
        )
      })
    );
  });

  constructor(private actions$: Actions,
              private cacheStoreService: CacheStoreService,
              private storageService: StorageService) {
  }
}
