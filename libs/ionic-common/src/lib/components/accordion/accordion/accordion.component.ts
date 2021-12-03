import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dd-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input()
  items: Array<{title: string, content: string}>;

  constructor() { }

  ngOnInit(): void {
  }

}
