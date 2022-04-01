import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {CommercialProductsService, ProductsService} from "@homecare/product";
import {first, map, mergeMap, tap} from "rxjs/operators";
import {CommercialProduct, pluck} from "@homecare/shared";
import {CurrentJobService} from "../services/current-job/current-job.service";


@Injectable({
  providedIn: 'root'
})
export class QuoteUnacceptedResolver implements Resolve<boolean> {

  constructor(private currentJobService: CurrentJobService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.currentJobService.quote$.pipe(
      first(),
      map(quote => {
        if (quote?.accepted) {
          return false;
        }

        return true;
      }),
      tap(async resolve => {
        if (!resolve) {
          await this.redirect();
        }
      })
    );

  }

  async redirect() {
    this.currentJobService.job$.pipe(first()).subscribe(
      async job => {
        await this.router.navigate(['/job', `${job.appointmentId}`, 'quote-complete']);
      }
    );

  }
}
