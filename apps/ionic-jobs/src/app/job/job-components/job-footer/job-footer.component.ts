import {Component, Input, OnInit} from '@angular/core';
import {ButtonConfig} from "@homecare/common";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {findByKey} from "@homecare/shared";

@Component({
  selector: 'hc-job-footer',
  templateUrl: './job-footer.component.html',
  styleUrls: ['./job-footer.component.scss']
})
export class JobFooterComponent implements OnInit {

  @Input()
  buttonConfigs$: Observable<ButtonConfig[]>;

  buttonConfigSlots$: Observable<{
    start: ButtonConfig[],
    center: ButtonConfig[],
    end: ButtonConfig[]
  }>

  constructor() {
  }

  ngOnInit(): void {
    this.buttonConfigSlots$ = this.buttonConfigs$.pipe(
      map(buttonConfigs => {
        return {
          start: findByKey(buttonConfigs, 'slot', 'start'),
          center: findByKey(buttonConfigs, 'slot', 'center'),
          end: findByKey(buttonConfigs, 'slot', 'end'),
        }
      })
    )
  }

}
