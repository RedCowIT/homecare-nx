import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

/**
 * Boilerplate for components to unsubscribe to streams using pipe(takeUntil(this.destroyed$))
 *
 * Note, takeUntil must be the final operator in a sequence.
 */
export abstract class SubscribedContainer implements OnDestroy {
  destroyed$ = new Subject<void>();
  /**
   * DO NOT this.destroyed$.complete();
   * It is not necessary:
   * https://stackoverflow.com/questions/44289859/do-i-need-to-complete-a-subject-for-it-to-be-garbage-collected
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
