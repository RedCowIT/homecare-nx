import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiUrlService} from "@homecare/common";
import {Observable} from "rxjs";
import {Document, GlobalPaymentRequest, GlobalPaymentResponse} from "@homecare/shared";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GlobalPaymentsService {

  constructor(protected httpClient: HttpClient,
              protected apiUrlService: ApiUrlService) {
  }

  initPayment(globalPaymentRequest: GlobalPaymentRequest): Observable<GlobalPaymentResponse> {

    return this.httpClient.post(this.url(), globalPaymentRequest).pipe(
      map((response: any) => {
        console.log('global payments', response);
        return response?.data as GlobalPaymentResponse;
      })
    );

  }

  url(): string {
    return this.apiUrlService.url('globalPayments');
  }

}
