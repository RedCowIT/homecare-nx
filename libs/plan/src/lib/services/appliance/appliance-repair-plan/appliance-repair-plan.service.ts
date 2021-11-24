import {CustomerPlan, CustomerPlanAppliance} from "@homecare/shared";
import {HttpClient} from "@angular/common/http";
import {ApiUrlService} from "@homecare/common";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApplianceRepairPlanService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) {
  }

  calculatePeriodPrice(customerPlanAppliance: Partial<CustomerPlanAppliance>): Observable<{ periodPrice: number }> {
    return this.http.post(this.apiUrlService.url('/calculateAppliancePlanPrice'), customerPlanAppliance)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      )
  }
}
