import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {DocumentSubType, DocumentSubTypes, PreJobSection, selectFirstEntityByKey} from "@homecare/shared";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {DocumentsService, DocumentSubTypesService, DocumentTypesService} from "@homecare-nx/document";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";

@Component({
  selector: 'hc-post-job-after-photos',
  templateUrl: './post-job-after-photos.component.html',
  styleUrls: ['./post-job-after-photos.component.scss']
})
export class PostJobAfterPhotosComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  documentSubType$: Observable<DocumentSubType>;


  constructor(public route: ActivatedRoute,
              public router: Router,
              public currentJobService: CurrentJobService,
              public documentsService: DocumentsService,
              public documentTypesService: DocumentTypesService,
              public documentSubTypesService: DocumentSubTypesService) {

    this.documentSubType$ = selectFirstEntityByKey(this.documentSubTypesService,
      'description',
      DocumentSubTypes.AfterPic);

  }

  ngOnInit(): void {

    // this.currentJobService.getNextPreJobSectionUrl(currentSection);
    this.footerButtons$.next([
      createFooterNextButton(async () => {

      })
    ])
  }

}
