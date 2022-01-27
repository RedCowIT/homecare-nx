import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import {dataServiceError, httpError} from '../actions/data-error.actions';
import {DataErrorService} from '../../services/data-error/data-error.service';



@Injectable()
export class DataErrorEffects {

  httpError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(httpError),
      tap(action => {
        this.dataErrorService.handleHttpError(action.httpResponse);
      })
    );
  }, {dispatch: false});

  dataServiceError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dataServiceError),
      tap(action => {
        this.dataErrorService.handleDataServiceError(action.error);
      })
    );
  }, {dispatch: false});

  constructor(private actions$: Actions, private dataErrorService: DataErrorService) {
  }

}
