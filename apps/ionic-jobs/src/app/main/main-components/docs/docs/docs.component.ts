import {Component, OnInit} from '@angular/core';
import {ReferenceSectionsService, ReferencesService} from "@homecare-nx/document";
import {filter, first, map} from "rxjs/operators";
import {findByKey, firstItem, Reference} from "@homecare/shared";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";

@Component({
  selector: 'hc-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  referenceSectionId: number;

  references$: Observable<Reference[]>;

  segmentSectionChange$ = new BehaviorSubject<number>(undefined);

  constructor(public referenceSectionsService: ReferenceSectionsService,
              public referencesService: ReferencesService) {
  }

  ngOnInit(): void {

    this.references$ = combineLatest([
      this.segmentSectionChange$,
      this.referencesService.entities$
    ]).pipe(
      filter(([referenceSectionId, references]) => {
        return referenceSectionId !== undefined && references?.length > 0;
      }),
      map(([referenceSectionId, references]) => {

        return findByKey(references, 'referenceSectionId', referenceSectionId);

      })
    );

    this.referenceSectionsService.entities$.pipe(
      filter(referenceSections => referenceSections?.length > 0),
      first()
    ).subscribe(referenceSections => {
      this.referenceSectionId = firstItem(referenceSections).id;
      this.segmentSectionChange$.next(this.referenceSectionId);
    });
  }

  segmentChange() {
    this.segmentSectionChange$.next(this.referenceSectionId);
  }

  openReference(reference: Reference){
    window.open(encodeURI(reference.url),"_system","location=yes");
  }
}
