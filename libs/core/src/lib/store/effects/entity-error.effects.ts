import {Injectable} from '@angular/core';
import {Actions, createEffect} from '@ngrx/effects';
import {filter, map} from 'rxjs/operators';
import {DataServiceError, EntityAction, ofEntityOp, OP_ERROR} from '@ngrx/data';
import {dataServiceError, entityError, httpError} from '../actions/data-error.actions';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * Marshal entity operation error actions to universal data error action interface
 *
 * Entity operations that fail will dispatch EnityAction with an 'error' suffix.
 *
 * We map these errors to our error action interface for processing in a central service.
 */
@Injectable()
export class EntityErrorEffects {

  entityOpError$ = createEffect(() => {
    return this.actions$.pipe(
      ofEntityOp(),
      filter((action: EntityAction) =>
        action.payload.entityOp.endsWith(OP_ERROR)
      ),
      map((action: EntityAction) => {

        const error = action.payload.data ? action.payload.data.error : null;

        if (error) {
          if (error instanceof DataServiceError) {

            // Http Error

            if (error.error instanceof HttpErrorResponse) {
              return httpError({
                httpResponse: error.error,
                originalAction: action.payload.data.originalAction,
              });
            }

            // Other DataService error (can still be server related, i.e. empty response)

            return dataServiceError({
              error: error,
              originalAction: action.payload.data.originalAction
            });

          }
        }

        // Catch all error
        return entityError({
          error: error,
          originalAction: action.payload.data?.originalAction,
        });

      })
    );
  });

  constructor(private actions$: Actions) {
  }

}
