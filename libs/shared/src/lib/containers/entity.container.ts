import {Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {EntityCollectionServiceBase} from "@ngrx/data";
import {selectEntity} from "../utils";
import {SubscribedContainer} from "./subscribed-container";

/**
 * Base class for components that deal with a single ngrx entity.
 */
export abstract class EntityContainer<T> extends SubscribedContainer implements OnInit {

  @Input()
  id: number;

  model$: Observable<T>;

  protected constructor(public entityService: EntityCollectionServiceBase<T>) {
    super();
  }

  ngOnInit(): void {

    if (!this.id) {
      console.warn('Input entity ID is null, did you forget to set the component input?');
      return;
    }

    this.model$ = selectEntity(this.entityService, this.id);
  }
}
