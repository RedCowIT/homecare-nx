import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiUrlService} from "@homecare/common";
import {Observable} from "rxjs";
import {GlobalPaymentRequest, GlobalPaymentResponse, GlobalPaymentResult} from "@homecare/shared";
import {map} from "rxjs/operators";
import {GlobalPaymentCharge} from "../../../../../../shared/src/lib/models/payment/global-payment/global-payment-charge";

@Injectable({
  providedIn: 'root'
})
export class GlobalPaymentsService {

  constructor(protected httpClient: HttpClient,
              protected apiUrlService: ApiUrlService) {
  }

  createPaymentCharge(globalPaymentRequest: GlobalPaymentRequest): Observable<GlobalPaymentCharge> {

    const url = this.apiUrlService.url('createGlobalPaymentCharge');

    return this.httpClient.post(url, globalPaymentRequest).pipe(
      map((response: any) => {

        const result = response?.data as GlobalPaymentCharge;

        result.chargeResponse = JSON.parse(result.chargeResponse);

        return result;
      })
    );

  }

  processPaymentResponse(globalPaymentResponse: GlobalPaymentResponse): Observable<GlobalPaymentResult> {

    const url = this.apiUrlService.url('processGlobalPaymentResponse');

    return this.httpClient.post(url, globalPaymentResponse).pipe(
      map((response: any) => {

        return response?.data as GlobalPaymentResult;
      })
    );

  }

}
