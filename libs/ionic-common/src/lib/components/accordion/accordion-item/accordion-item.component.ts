import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dd-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss']
})
export class AccordionItemComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  content: string;

  @Input()
  expanded: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
