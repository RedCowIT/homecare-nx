import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import {dataServiceError, httpError} from '../actions/data-error.actions';
import {DataErrorService} from '../../services/data-error/data-error.service';
import {LoggerService} from "../../services/logger/logger.service";



@Injectable()
export class DataErrorEffects {

  httpError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(httpError),
      tap(action => {
        try {
          this.dataErrorService.handleHttpError(action.httpResponse);
        }
        catch (error){
          this.logger.error('Failed handling http error', error);
        }
      })
    );
  }, {dispatch: false});

  dataServiceError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dataServiceError),
      tap(action => {
        try {
          this.dataErrorService.handleDataServiceError(action.error);
        } catch (error){
          this.logger.error('Failed handling data service error', error);
        }
      })
    );
  }, {dispatch: false});

  constructor(private actions$: Actions,
              private dataErrorService: DataErrorService,
              private logger: LoggerService) {
  }

}
