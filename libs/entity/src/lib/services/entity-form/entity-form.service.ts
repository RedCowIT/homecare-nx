import {FormBuilder, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

/**
 * Base form service for managing single entities.
 *
 * Extend and <em>provide</em> at component level for clean state.
 */
@Injectable()
export abstract class EntityFormService {

  form: FormGroup;

  private _editMode: boolean;

  protected constructor(protected fb: FormBuilder) {
    this.init();
  }

  get editMode(): boolean {
    return this._editMode;
  }

  set editMode(editMode: boolean) {
    this._editMode = editMode;
    this.editModeSet();
  }

  /**
   * Creates a DTO using the form object.
   *
   * Override for more advanced objects, or where models and form field ids do not exactly match.
   *
   * @param options
   */
  public createDTO<T>(options?: any): Partial<T> {

    const value = {
      ...this.form.value
    };

    if (options?.groupName) {
      return value[options.groupName];
    }

    return value;
  }

  public setValues(values: any, options?: any): void {

    this.form.patchValue(values);
    this.valuesSet();

    if (options?.disableValid) {
      Object.keys(values).forEach((key: string) => {

        // Get a reference to the control using the FormGroup.get() method
        const control = this.form.get(key);
        if (control.valid) {
          control.disable();
        }
      });
    }
  }

  public reset(value?: any): void {
    this.form.reset(value);
  }

  protected abstract init(): void;

  protected editModeSet() {
    // noop
  }

  protected valuesSet() {
    // noop
  }
}
