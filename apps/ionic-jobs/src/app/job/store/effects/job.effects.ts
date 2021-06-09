import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addJob, setJobSections} from "../actions/job.actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {JobSection, JobSectionStatus} from "@homecare/shared";
import {JobService} from "../../services/job/job.service";
import {ChecklistItemStatus} from "@homecare/common";
import {combineLatest, Observable, of, throwError} from "rxjs";


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


    return combineLatest([
      this.jobsService.isNCOOnly(appointmentId)
    ]).pipe(
      map(([isNCOOnly]) => {

        const sections = [
          {
            id: JobSection.Info,
            status: ChecklistItemStatus.Enabled
          }
        ];

        if (!isNCOOnly){
          sections.push({
            id: JobSection.PreJob,
            status: ChecklistItemStatus.Enabled
          });
        }

        sections.push(
          {
            id: JobSection.Quote,
            status: ChecklistItemStatus.Disabled
          },
          {
            id: JobSection.Contact,
            status: ChecklistItemStatus.Disabled
          },
          {
            id: JobSection.Invoice,
            status: ChecklistItemStatus.Disabled
          },
          {
            id: JobSection.Payment,
            status: ChecklistItemStatus.Disabled
          },
          {
            id: JobSection.DD,
            status: ChecklistItemStatus.Disabled
          }
        );

        return sections;

      })
    )
  }

}
