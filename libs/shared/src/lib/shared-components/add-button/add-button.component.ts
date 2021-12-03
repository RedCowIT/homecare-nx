import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hc-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {

  @Input()
  color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
