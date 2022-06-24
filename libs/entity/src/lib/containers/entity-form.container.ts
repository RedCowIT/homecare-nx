import {EMPTY, Observable} from "rxjs";
import {filter, first, takeUntil, tap} from "rxjs/operators";
import {EntityCollectionServiceBase} from "@ngrx/data";
import {ApiValidationErrors, catchHttpValidationErrors, EntityContainer} from "@homecare/shared";
import {EntityFormService} from "@homecare/entity";
import {EventEmitter, Input, OnInit, Output} from "@angular/core";

/**
 * Base class for form components performing standard create/update ops on a single entity.
 */
export abstract class EntityFormContainer<T> extends EntityContainer<T> implements OnInit {

  static readonly OPERATION_CREATE = 'create';
  static readonly OPERATION_UPDATE = 'update';
  static readonly OPERATION_DELETE = 'delete';

  @Output()
  create = new EventEmitter<T>();

  @Output()
  update = new EventEmitter<T>();

  @Output()
  delete = new EventEmitter<T>();

  isSubmitted: boolean;

  public errors: string[];

  public isLoading: boolean;

  public groupName: string;

  protected constructor(public formService: EntityFormService,
                        public entityService: EntityCollectionServiceBase<T>) {

    super(entityService);

    this.initLoading();
  }

  ngOnInit() {

    super.ngOnInit();

    this.setEditMode(!!this.id);



    if (this.isEditMode()) {
      this.model$.pipe(
        filter(model => !!model),
        first(),
        takeUntil(this.destroyed$)
      ).subscribe(model => {

        this.patchForm(model);
      });
    }
  }

  public async submit() {

    this.isSubmitted = true;

    this.errors = null;

    const dto = this.createDTO();


    if (this.formService.editMode) {

      await this.doOperation(
        this.doUpdate(dto),
        EntityFormContainer.OPERATION_UPDATE);

    } else {

      await this.doOperation(this.doCreate(dto as T), EntityFormContainer.OPERATION_CREATE);

    }
  }

  public async deleteEntity() {

    this.errors = null;

    if (this.formService.editMode) {

      await this.doOperation(
        this.doDelete(),
        EntityFormContainer.OPERATION_DELETE);

    }
  }


  protected patchForm(value: any) {
    let patch: any = {};

    if (this.groupName) {
      patch[this.groupName] = value;
    } else {
      patch = value;
    }

    this.formService.form.patchValue(patch);
  }

  protected createDTO(): Partial<T> {
    return this.formService.createDTO<T>({groupName: this.groupName});
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

  protected doDelete(): Observable<string | number> {
    if (!this.entityService) {
      throw new Error('SimpleForm subclasses must implement update or set a default entity service');
    }
    return this.entityService.delete(this.id);
  }

  protected async doOperation(operation$, operationType: 'create' | 'update' | 'delete') {
    operation$.pipe(
      catchHttpValidationErrors((errors: ApiValidationErrors) => {

        if (errors?.errors?.length) {
          this.errors = errors.errors;
        } else if (errors.message) {
          try{
            const jsonError = JSON.parse(errors.message);
            this.errors = [jsonError.message];
          } catch (e){
            this.errors = [errors.message];
          }
        }

        return EMPTY;
      }),
      first()
    ).subscribe(entity => {

      switch (operationType) {
        case EntityFormContainer.OPERATION_CREATE:
          this.entityCreated(entity);
          break;
        case EntityFormContainer.OPERATION_UPDATE:
          this.entityUpdated(entity);
          break;
        case EntityFormContainer.OPERATION_DELETE:
          this.entityDeleted(entity);
          break;

      }
    });
  }

  protected async entityCreated(entity: T) {
    this.create.emit(entity);
  }

  protected async entityUpdated(entity: T) {
    this.update.emit(entity);
  }

  protected async entityDeleted(entity: T) {
    this.delete.emit(entity);
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

  /**
   * Mark all form controls as touched to force display of validation highlighting
   *
   * @return true if form is valid
   */
  public validate(): boolean {
    this.formService.form.markAllAsTouched();
    return this.formService.form.valid;
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
