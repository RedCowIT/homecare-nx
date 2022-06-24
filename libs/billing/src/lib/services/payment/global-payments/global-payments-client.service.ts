import {Injectable} from "@angular/core";
import {GlobalPaymentCharge, GlobalPaymentRequest, GlobalPaymentResponse, GlobalPaymentResult} from "@homecare/shared";
import {GlobalPaymentsService} from "./global-payments.service";
import {Observable, of, Subject} from "rxjs";
import {catchError, first, map, mergeMap} from "rxjs/operators";

declare let RealexHpp: any;

@Injectable()
export class GlobalPaymentsClientService {


  constructor(private globalPaymentsService: GlobalPaymentsService) {
  }

  checkout(iframeId: string, chargeRequest: GlobalPaymentRequest): Observable<any> {

    return this.createCharge(chargeRequest).pipe(
      mergeMap((charge: GlobalPaymentCharge) => {

        const process$ = new Subject<any>();

        RealexHpp.setHppUrl(charge.url);

        RealexHpp.embedded.init(
          "autoload",
          iframeId,
          (answer, close) => {
            process$.next({answer, close});
            process$.complete();
          }, charge.chargeResponse);

        return process$;

      }),
      mergeMap((response: { answer: any, close: any }) => {
        return this.processResponse(response.answer, response.close);
      })
    );

  }

  private createCharge(chargeRequest: GlobalPaymentRequest): Observable<GlobalPaymentCharge> {
    return this.globalPaymentsService.createPaymentCharge(chargeRequest);
  }

  private processResponse(response: any, close: any): Observable<GlobalPaymentResult> {

    return this.globalPaymentsService.processPaymentResponse({
      response
    }).pipe(
      catchError(error => {

        return of(null);
      })
    );

  }

}
