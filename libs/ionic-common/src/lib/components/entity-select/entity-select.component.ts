import {Component, Input, OnInit} from '@angular/core';
import {EntityServices} from "@ngrx/data";
import {FormGroup} from "@angular/forms";
import {assertTrue, toTitleCase} from "@homecare/common";
import {Observable} from "rxjs";

/**
 * An <ion-select> powered by an entity service
 */
@Component({
  selector: 'dd-entity-select',
  templateUrl: './entity-select.component.html',
  styleUrls: ['./entity-select.component.scss']
})
export class EntitySelectComponent implements OnInit {

  @Input()
  formGroup: FormGroup;

  @Input()
  formGroupNameKey: string;

  @Input()
  label: string;

  @Input()
  labelKey = 'description';

  @Input()
  valueKey = 'id';

  @Input()
  fieldName: string;

  @Input()
  entityName: string;

  entities$: Observable<any[]>;

  constructor(public entityServices: EntityServices) {
  }

  ngOnInit(): void {
    assertTrue(!!this.formGroup, 'missing form');
    assertTrue(!!this.fieldName, 'missing fieldName');
    assertTrue(!!this.formGroupNameKey, 'missing formGroupNameKey');
    assertTrue(!!this.entityName, 'missing entity name');

    this.entities$ = this.entityServices.getEntityCollectionService(this.entityName).entities$;

    if (!this.label) {
      this.label = this.getDefaultLabel();
    }
  }

  getDefaultLabel(): string {
    return toTitleCase(this.entityName);
  }

}
