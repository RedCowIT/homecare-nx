import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";
import {Policy, PreJobSection} from "@homecare/shared";
import {BehaviorSubject, Observable} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {PolicyService} from "@homecare/core";
import {first, map} from "rxjs/operators";

@Component({
  selector: 'hc-pre-job-policies',
  templateUrl: './pre-job-policies.component.html',
  styleUrls: ['./pre-job-policies.component.scss']
})
export class PreJobPoliciesComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  policyItems$: Observable<Array<{ title: string, content: string }>>;

  constructor(public route: ActivatedRoute,
              public router: Router,
              public currentJobService: CurrentJobService,
              public policyService: PolicyService) {

  }

  ngOnInit(): void {

    this.currentJobService.appointment$.pipe(first()).subscribe(
      appointment => {
        this.policyService.getWithQuery({
          customerId: `${appointment.customerId}`
        });
      }
    );

    this.policyItems$ = this.policyService.entities$.pipe(
      map((policies: Policy[]) => {
        return policies.map(policy => {
          return {
            title: policy.title,
            content: policy.body
          }
        })
      })
    );

    // this.currentJobService.getNextPreJobSectionUrl(currentSection);
    this.footerButtons$.next([
      createFooterBackButton(async () => {
        await this.currentJobService.navToPrevJobSection(PreJobSection.Policies);
      }),
      createFooterNextButton(async () => {

        this.currentJobService.completePreJobSection(PreJobSection.Policies);

      })
    ])
  }
}
