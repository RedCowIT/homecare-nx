import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'dd-entity-form-submit',
  templateUrl: './entity-form-submit.component.html',
  styleUrls: ['./entity-form-submit.component.scss']
})
export class EntityFormSubmitComponent {

  @Input()
  loading: boolean;

  @Input()
  disabled: boolean;

  @Input()
  label: string;

  @Output()
  submitted = new EventEmitter();

  onSubmit(){
    this.submitted.emit();
  }

}
