import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {CommercialProductsService, ProductsService} from "@homecare/product";
import {map, mergeMap} from "rxjs/operators";
import {CommercialProduct, pluck} from "@homecare/shared";


@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<boolean> {

  constructor(private commercialProductsService: CommercialProductsService,
              private productsService: ProductsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return of(true);

    // return this.commercialProductsService.getAll().pipe(
    //   mergeMap((commercialProducts: CommercialProduct[]) => {
    //     const productIds = pluck(commercialProducts, 'productId');
    //     return this.productsService.getWithQuery({ids: productIds})
    //   }),
    //   map(() => true)
    // );
  }
}
