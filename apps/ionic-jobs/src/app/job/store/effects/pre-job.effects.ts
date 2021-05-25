import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addJob, setJobSections, updateJob} from "../actions/job.actions";
import {catchError, map, mergeMap, withLatestFrom} from "rxjs/operators";
import {JobSection, JobSectionStatus, PreJobSection, PreJobSectionStatus} from "@homecare/shared";
import {JobService} from "../../services/job/job.service";
import {ChecklistItemStatus} from "@homecare/common";
import {initPreJobSections, setPreJobSections} from "../actions/pre-job.actions";
import {Observable, of, throwError} from "rxjs";


@Injectable()
export class PreJobEffects {

  addJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addJob),
      mergeMap(action => {
        return this.createPreJobSections(action.appointmentId).pipe(
          map(preJobSections => {
            return setPreJobSections({appointmentId: action.appointmentId, preJobSections});
          }),
          catchError(error => {
            return throwError(error);
          })
        );
      })
    );
  });

  initPreJobSections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initPreJobSections),
      withLatestFrom(this.jobsService.entityMap$),
      map(([action, jobMap]) => {

        const job = {...jobMap[action.appointmentId]};

        const sections = [
          {
            id: PreJobSection.WorkSummary,
            status: ChecklistItemStatus.Enabled
          }
        ];

        job.preJobSections = sections;
        console.log('updatejob', job);
        return updateJob({job})
      })
    );
  });


  constructor(private actions$: Actions,
              private jobsService: JobService) {
  }

  private createPreJobSections(appointmentId: number):
    Observable<PreJobSectionStatus[]> {

    const sections = [
      {
        id: PreJobSection.WorkSummary,
        status: ChecklistItemStatus.Enabled
      }
    ];

    return of(sections);

  }
}
