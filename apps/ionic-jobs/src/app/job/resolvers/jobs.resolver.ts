import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {JobsLoaderService} from "../services/jobs-loader/jobs-loader.service";


@Injectable({
  providedIn: 'root'
})
export class JobsResolver implements Resolve<boolean> {

  constructor(private jobsLoaderService: JobsLoaderService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    console.log('jobs resolver');

    try {
      this.jobsLoaderService.loadAll();
    } catch (error){
       console.error('Error loading all job relations');
    }

    return of(true);
  }
}
