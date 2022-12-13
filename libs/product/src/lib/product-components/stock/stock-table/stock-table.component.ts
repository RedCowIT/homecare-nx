import {Component, OnInit} from '@angular/core';
import {StockTableService} from "../../../services/stock-table/stock-table.service";

@Component({
  selector: 'hc-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss'],
  providers: [StockTableService]
})
export class StockTableComponent implements OnInit {

  constructor(public stockTableService: StockTableService) {
  }

  ngOnInit(): void {
    this.stockTableService.init();
    this.stockTableService.load();
  }

}
