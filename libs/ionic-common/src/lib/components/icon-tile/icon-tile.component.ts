import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'dd-icon-tile',
  templateUrl: './icon-tile.component.html',
  styleUrls: ['./icon-tile.component.scss']
})
export class IconTileComponent implements OnInit {

  @Input()
  icon: string;

  @Input()
  label: string;

  @Input()
  badge: string;

  @Input()
  color: string;

  @Input()
  highlight: boolean;

  @Output()
  select = new EventEmitter<IconTileComponent>();

  constructor() { }

  ngOnInit(): void {
  }

}
