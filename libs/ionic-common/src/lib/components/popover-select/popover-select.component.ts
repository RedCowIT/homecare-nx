import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectOption} from "@homecare/common";
import {PopoverController} from "@ionic/angular";

@Component({
  selector: 'dd-popover-select',
  templateUrl: './popover-select.component.html',
  styleUrls: ['./popover-select.component.scss']
})
export class PopoverSelectComponent implements OnInit {

  @Input()
  options: SelectOption[];

  @Output()
  selected = new EventEmitter<SelectOption>();

  constructor(private popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
  }

  async select(option: SelectOption) {
    await this.popoverCtrl.dismiss({ option });
  }
}
