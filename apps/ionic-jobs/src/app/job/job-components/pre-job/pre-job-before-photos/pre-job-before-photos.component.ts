import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";
import {PreJobSection} from "@homecare/shared";

@Component({
  selector: 'hc-pre-job-before-photos',
  templateUrl: './pre-job-before-photos.component.html',
  styleUrls: ['./pre-job-before-photos.component.scss']
})
export class PreJobBeforePhotosComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  constructor(public route: ActivatedRoute,
              public router: Router,
              public currentJobService: CurrentJobService) {

  }

  ngOnInit(): void {

    // this.currentJobService.getNextPreJobSectionUrl(currentSection);
    this.footerButtons$.next([
      createFooterBackButton(async () => {
        await this.currentJobService.navToPrevJobSection(PreJobSection.BeforePhotos);
      }),
      createFooterNextButton(async () => {
        this.currentJobService.completePreJobSection(PreJobSection.BeforePhotos);
      })
    ])
  }
}
