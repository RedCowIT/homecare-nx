import {CustomerPlanFinance} from "@homecare/shared";
import {HttpClient} from "@angular/common/http";
import {ApiUrlService} from "@homecare/common";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FinancePlanService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) {
  }

  calculate(customerPlanFinance: Partial<CustomerPlanFinance>): Observable<{
    loan: number,
    interest: number,
    totalPayable: number,
    monthlyPayment: number
  }> {
    return this.http.post(this.apiUrlService.url('/calculateFinancePlan'), customerPlanFinance)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      )
  }
}
