import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addJob, completeJobSection} from "../actions/job.actions";
import {catchError, filter, map, mergeMap, withLatestFrom} from "rxjs/operators";
import {
  CallType,
  containsItemWithKey,
  findById,
  findByKey,
  findIndexWithId,
  firstItem,
  JobSection,
  PreJobReport,
  PreJobSection,
  PreJobSectionStatus
} from "@homecare/shared";
import {JobService} from "../../services/job/job.service";
import {ChecklistItemStatus} from "@homecare/common";
import {completePreJobSection, setPreJobSections} from "../actions/pre-job.actions";
import {Observable, throwError} from "rxjs";
import {getJobMap} from "../selectors/job.selectors";
import {Store} from "@ngrx/store";


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

  completePreJobSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(completePreJobSection),
      withLatestFrom(this.store$.select(getJobMap)),
      filter(([action, jobMap]) => !!jobMap[action.appointmentId]),
      map(([action, jobMap]) => {

        const job = {...jobMap[action.appointmentId]};

        const sections = job.preJobSections.map(preJobSection => {
          return {...preJobSection};
        });

        const index = findIndexWithId(sections, action.sectionId);

        const section = findById(sections, action.sectionId);
        section.status = ChecklistItemStatus.Complete;

        if (index < sections.length - 1) {
          if (sections[index + 1].status == ChecklistItemStatus.Disabled) {
            sections[index + 1].status = ChecklistItemStatus.Enabled;
          }
        }

        return setPreJobSections({appointmentId: action.appointmentId, preJobSections: sections});

      })
    );
  });

  /**
   * Completes Job section if preJob section is the last
   */
  setPreJobSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setPreJobSections),
      filter(action => action.preJobSections[action.preJobSections.length - 1].status == ChecklistItemStatus.Complete),
      map(action => {

        return completeJobSection({appointmentId: action.appointmentId, sectionId: JobSection.PreJob});

      })
    );
  });

  constructor(private actions$: Actions,
              private jobsService: JobService,
              private store$: Store) {
  }

  private createPreJobSections(appointmentId: number):
    Observable<PreJobSectionStatus[]> {

    return this.jobsService.selectAppointmentCallTypes(appointmentId).pipe(
      map(callTypes => {

        const sections = [
          {
            id: PreJobSection.WorkSummary,
            status: ChecklistItemStatus.Enabled
          },
          {
            id: PreJobSection.Appliances,
            status: ChecklistItemStatus.Enabled
          },
          {
            id: PreJobSection.BeforePhotos,
            status: ChecklistItemStatus.Disabled
          }
        ];

        if (callTypes){
          if (containsItemWithKey(callTypes, 'carpet', true)) {
            sections.push({
              id: PreJobSection.ShampooReport,
              status: ChecklistItemStatus.Disabled
            });
          }

          if (containsItemWithKey(callTypes, 'vacuum', true)) {
            sections.push({
              id: PreJobSection.VacuumReport,
              status: ChecklistItemStatus.Disabled
            });
          }
        }

        sections.push({
          id: PreJobSection.Policies,
          status: ChecklistItemStatus.Disabled
        });

        sections.push({
          id: PreJobSection.Signature,
          status: ChecklistItemStatus.Disabled
        });

        return sections;

      })
    )
  }

  requiresPreJobReport(callTypes: CallType[], preJobReport: PreJobReport) {
    return !!firstItem(findByKey(callTypes, preJobReport, 1));
  }
}
