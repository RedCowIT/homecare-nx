import {EMPTY, Observable} from "rxjs";
import {first, takeUntil, tap} from "rxjs/operators";
import {EntityCollectionServiceBase} from "@ngrx/data";
import {ApiValidationErrors, catchHttpValidationErrors, EntityContainer} from "@homecare/shared";
import {EntityFormService} from "@homecare/entity";
import {EventEmitter, OnInit, Output} from "@angular/core";

/**
 * Base class for form components performing standard create/update ops on a single entity.
 */
export abstract class EntityFormContainer<T> extends EntityContainer<T> implements OnInit {

  static readonly OPERATION_CREATE = 'create';
  static readonly OPERATION_UPDATE = 'update';

  @Output()
  create = new EventEmitter<T>();

  @Output()
  update = new EventEmitter<T>();

  public errors: string[];

  public isLoading: boolean;

  protected constructor(public formService: EntityFormService,
                        public entityService: EntityCollectionServiceBase<T>) {

    super(entityService);

    this.initLoading();
  }

  ngOnInit() {

    super.ngOnInit();

    console.log('setTeditMode', {'id':this.id, 'enabled': !!this.id});

    this.setEditMode(!!this.id);

    if (this.isEditMode()) {
      this.model$.pipe(first()).subscribe(model => {
        this.patchForm(model);
      });
    }
  }

  public async submit() {

    this.errors = null;

    const dto = this.createDTO();

    if (this.formService.editMode) {

      console.log('submit edit mode');

      await this.doOperation(
        this.doUpdate(dto),
        EntityFormContainer.OPERATION_UPDATE);

    } else {

      console.log('submit create mode');

      await this.doOperation(this.doCreate(dto as T), EntityFormContainer.OPERATION_CREATE);

    }
  }

  protected patchForm(value: any) {
    this.formService.form.patchValue(value);
  }

  protected createDTO(): Partial<T> {
    return this.formService.createDTO<T>();
  }

  protected doUpdate(model: Partial<T>): Observable<T> {
    if (!this.entityService) {
      throw new Error('SimpleForm subclasses must implement update or set a default entity service');
    }
    return this.entityService.update(model);
  }

  protected doCreate(model: T): Observable<T> {
    if (!this.entityService) {
      throw new Error('SimpleForm subclasses must implement create or set a default entity service');
    }
    return this.entityService.add(model);
  }

  protected async doOperation(operation$, operationType: 'create' | 'update') {
    operation$.pipe(
      catchHttpValidationErrors((errors: ApiValidationErrors) => {
        this.errors = errors.errors;
        return EMPTY;
      }),
      first()
    ).subscribe(entity => {
      if (operationType === EntityFormContainer.OPERATION_CREATE) {
        this.entityCreated(entity);
      } else if (operationType === EntityFormContainer.OPERATION_UPDATE) {
        this.entityUpdated(entity);
      }
    });
  }

  protected async entityCreated(entity: T) {

    this.create.emit(entity);

    // const message = this.getCreateSuccessMessage(entity);
    // if (message) {
    //   await this.presentSuccess(message);
    // }
  }

  protected async entityUpdated(entity: T) {

    this.update.emit(entity);

    // const message = this.getUpdateSuccessMessage(entity);
    // if (message) {
    //   await this.presentSuccess(message);
    // }
  }

  protected async presentSuccess(message: string) {
    // if (!this.alertService) {
    //   throw new Error('You specified a success message but did not set alertService property')
    // }
    // const toast = await this.alertService.success(message);
    // await toast.present();
  }

  protected getCreateSuccessMessage(dto: Partial<T>): string {
    return null;
  }

  protected getUpdateSuccessMessage(dto: Partial<T>): string {
    return null;
  }

  public isEditMode(): boolean {
    return this.formService.editMode;
  }

  protected setEditMode(editMode: boolean) {
    this.formService.editMode = editMode;
  }

  protected isLoadingAsync(): Observable<boolean> {
    if (this.entityService) {
      return this.entityService.loading$;
    }
  }

  protected initLoading() {
    this.isLoadingAsync().pipe(
      tap(isLoading => this.isLoading = isLoading),
      takeUntil(this.destroyed$)
    ).subscribe();
  }
}