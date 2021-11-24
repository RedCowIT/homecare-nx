import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addJob, completeJobSection, setJobSections} from "../actions/job.actions";
import {catchError, filter, map, mergeMap, withLatestFrom} from "rxjs/operators";
import {findById, findIndexWithId, JobSection, JobSectionStatus} from "@homecare/shared";
import {JobService} from "../../services/job/job.service";
import {ChecklistItemStatus} from "@homecare/common";
import {combineLatest, Observable, of, throwError} from "rxjs";
import {completePreJobSection, setPreJobSections} from "../actions/pre-job.actions";
import {getJobMap} from "../selectors/job.selectors";
import {Store} from "@ngrx/store";


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

  completeJobSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(completeJobSection),
      withLatestFrom(this.store$.select(getJobMap)),
      filter(([action, jobMap]) => !!jobMap[action.appointmentId]),
      map(([action, jobMap]) => {

        const job = {...jobMap[action.appointmentId]};

        const sections = job.jobSections.map(jobSection => {
          return {...jobSection};
        });

        const index = findIndexWithId(sections, action.sectionId);

        const section = findById(sections, action.sectionId);
        section.status = ChecklistItemStatus.Complete;

        if (index < sections.length - 1) {
          if (sections[index + 1].status == ChecklistItemStatus.Disabled) {
            sections[index + 1].status = ChecklistItemStatus.Enabled;
          }
        }

        return setJobSections({appointmentId: action.appointmentId, jobSections: sections});

      })
    );
  });


  constructor(private store$: Store,
              private actions$: Actions,
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
          },
          {
            id: JobSection.SignOff,
            status: ChecklistItemStatus.Disabled
          }
        );

        return sections;

      })
    )
  }

}
