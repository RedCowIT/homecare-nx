import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {CurrentJobService} from "../services/current-job/current-job.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentJobResolver implements Resolve<number> {

  constructor(private currentJobService: CurrentJobService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> {

    const appointmentId = parseInt(route.params.id);

    this.currentJobService.setAppointmentId(appointmentId);

    return of(appointmentId);
  }
}
