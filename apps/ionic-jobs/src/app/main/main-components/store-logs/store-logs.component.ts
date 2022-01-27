import { Component, OnInit } from '@angular/core';
import {StoreLogService} from "@homecare/core";

@Component({
  selector: 'hc-store-logs',
  templateUrl: './store-logs.component.html',
  styleUrls: ['./store-logs.component.scss']
})
export class StoreLogsComponent implements OnInit {

  constructor(public storeLogService: StoreLogService) { }

  ngOnInit(): void {
  }

  stringify(data: any){
    return JSON.stringify(data);
  }
}
