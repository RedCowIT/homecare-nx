import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addJob, setJobSections} from "../actions/job.actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {JobSection, JobSectionStatus} from "@homecare/shared";
import {JobService} from "../../services/job/job.service";
import {ChecklistItemStatus} from "@homecare/common";
import {Observable, of, throwError} from "rxjs";


@Injectable()
export class JobEffects {

  addJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addJob),
      mergeMap(action => {
        return this.createJobSections(action.appointmentId).pipe(
          map(jobSections => {
            return setJobSections({appointmentId: action.appointmentId, jobSections});
          }),
          catchError(error => {
            return throwError(error);
          })
        )
      })
    );
  });

  // initJobSections = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(initJobSections),
  //     withLatestFrom(this.jobsService.entityMap$),
  //     map(([action, jobMap]) => {
  //
  //       const job = {...jobMap[action.appointmentId]};
  //
  //       const sections = [
  //         {
  //           id: JobSection.Info,
  //           status: ChecklistItemStatus.Enabled
  //         }
  //       ];
  //
  //       job.sections = sections;
  //
  //       return updateJob({job})
  //     })
  //   );
  // });


  constructor(private actions$: Actions,
              private jobsService: JobService) {
  }

  private createJobSections(appointmentId: number):
    Observable<JobSectionStatus[]> {

    const sections = [
      {
        id: JobSection.Info,
        status: ChecklistItemStatus.Enabled
      }
    ];

    // prejob not available for delivery-only type jobs
    sections.push({
      id: JobSection.PreJob,
      status: ChecklistItemStatus.Enabled
    });

    return of(sections);

  }

}
