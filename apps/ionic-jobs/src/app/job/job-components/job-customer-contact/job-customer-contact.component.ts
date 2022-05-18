import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {VacuumReportFormComponent} from "../../../../../../../libs/appointment/src/lib/appointment-components/pre-job/vacuum-report-form/vacuum-report-form.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {createFooterBackButton, createFooterNextButton} from "../../support/footer-button-factory";
import {JobSection, PreJobSection} from "@homecare/shared";
import {CustomerContactFormComponent} from "../../../../../../../libs/customer/src/lib/customer-components/customer-contact-form/customer-contact-form.component";
import {CustomersService} from "@homecare/customer";

@Component({
  selector: 'hc-job-customer-contact',
  templateUrl: './job-customer-contact.component.html',
  styleUrls: ['./job-customer-contact.component.scss']
})
export class JobCustomerContactComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  @ViewChild(CustomerContactFormComponent)
  customerContactForm: CustomerContactFormComponent;

  constructor(public route: ActivatedRoute,
              public router: Router,
              public currentJobService: CurrentJobService,
              public customersService: CustomersService) {

  }

  ngOnInit(): void {

    // this.currentJobService.getNextPreJobSectionUrl(currentSection);
    this.footerButtons$.next([
      createFooterNextButton(async () => {

        if (this.customerContactForm.validate()){
          await this.customerContactForm.submit();
        }

      })
    ])
  }

  async next(){
    await this.router.navigateByUrl(`/job/${this.currentJobService.appointmentId}/invoice`);
  }
}
