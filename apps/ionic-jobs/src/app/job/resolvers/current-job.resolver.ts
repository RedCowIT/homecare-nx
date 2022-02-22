import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {CurrentJobService} from "../services/current-job/current-job.service";
import {catchError, delay, filter, first, map, timeout} from "rxjs/operators";
import {LoggerService} from "@homecare/core";
import {LoadingState} from "@homecare/shared";

@Injectable({
  providedIn: 'root'
})
export class CurrentJobResolver implements Resolve<number> {

  constructor(private currentJobService: CurrentJobService,
              private router: Router,
              private loggerService: LoggerService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> {

    const appointmentId = parseInt(route.params.id);

    console.log('CurrentJobResolver', appointmentId);

    this.currentJobService.setAppointmentId(appointmentId);

    return this.currentJobService.job$.pipe(
      filter(job => {
        console.log('CurrentJobResolver', job);
        return job.loadState === LoadingState.LOADED
      }),
      map(job => {
        console.log('CurrentJobResolver.return job', job);
        return job.appointmentId;
      }),
      first(),
      timeout(10000),
      catchError(error => {
        this.loggerService.error('Timed out waiting for job to load');
        this.router.navigateByUrl('/main/jobs');
        return of(null);
      })
    );
  }
}
