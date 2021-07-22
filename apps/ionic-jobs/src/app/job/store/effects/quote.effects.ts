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
  firstItem, JobSection,
  PreJobReport,
  PreJobSection,
  PreJobSectionStatus, QuoteSection, QuoteSectionStatus
} from "@homecare/shared";
import {JobService} from "../../services/job/job.service";
import {ChecklistItemStatus} from "@homecare/common";
import {completePreJobSection, setPreJobSections} from "../actions/pre-job.actions";
import {Observable, of, throwError} from "rxjs";
import {getJobMap} from "../selectors/job.selectors";
import {Store} from "@ngrx/store";
import {completeQuoteSection, setQuoteSections} from "../actions/quote.actions";


@Injectable()
export class QuoteEffects {

  addJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addJob),
      mergeMap(action => {
        return this.createQuoteSections(action.appointmentId).pipe(
          map(quoteSections => {
            return setQuoteSections({appointmentId: action.appointmentId, quoteSections});
          }),
          catchError(error => {
            return throwError(error);
          })
        );
      })
    );
  });

  completeQuoteSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(completeQuoteSection),
      withLatestFrom(this.store$.select(getJobMap)),
      filter(([action, jobMap]) => !!jobMap[action.appointmentId]),
      map(([action, jobMap]) => {

        const job = {...jobMap[action.appointmentId]};

        const sections = job.quoteSections.map(quoteSection => {
          return {...quoteSection};
        });

        const index = findIndexWithId(sections, action.sectionId);

        const section = findById(sections, action.sectionId);
        section.status = ChecklistItemStatus.Complete;

        if (index < sections.length - 1) {
          if (sections[index + 1].status == ChecklistItemStatus.Disabled) {
            sections[index + 1].status = ChecklistItemStatus.Enabled;
          }
        }

        return setQuoteSections({appointmentId: action.appointmentId, quoteSections: sections});

      })
    );
  });

  /**
   * Completes Job section if quote section is the last
   */
  setQuoteSections = createEffect(() => {
    return this.actions$.pipe(
      ofType(setQuoteSections),
      filter(action => action.quoteSections[action.quoteSections.length - 1].status == ChecklistItemStatus.Complete),
      map(action => {

        return completeJobSection({appointmentId: action.appointmentId, sectionId: JobSection.Quote});

      })
    );
  });

  constructor(private actions$: Actions,
              private jobsService: JobService,
              private store$: Store) {
  }

  private createQuoteSections(appointmentId: number):
    Observable<QuoteSectionStatus[]> {

    const sections = [
      {
        id: QuoteSection.ApplianceCover,
        status: ChecklistItemStatus.Enabled
      },
      {
        id: QuoteSection.Products,
        status: ChecklistItemStatus.Disabled
      },
      {
        id: QuoteSection.OtherPlans,
        status: ChecklistItemStatus.Disabled
      },
      {
        id: QuoteSection.CompleteQuote,
        status: ChecklistItemStatus.Disabled
      }
    ];

    return of(sections);

  }

  requiresPreJobReport(callTypes: CallType[], preJobReport: PreJobReport) {
    return !!firstItem(findByKey(callTypes, preJobReport, 1));
  }
}
