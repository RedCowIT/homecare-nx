import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {AppointmentSummaryTableService} from "../../../services/appointment-summary-table/appointment-summary-table.service";

@Component({
  selector: 'hc-appointment-summary-table',
  templateUrl: './appointment-summary-table.component.html',
  styleUrls: ['./appointment-summary-table.component.scss'],
  providers: [AppointmentSummaryTableService]
})
export class AppointmentSummaryTableComponent implements OnChanges, AfterViewInit {

  @Input()
  query: { startDate: string, endDate: string } | undefined;

  @ViewChild('callTypeTemplate') callTypeTmpl: TemplateRef<any> | undefined;

  constructor(public tableSource: AppointmentSummaryTableService) { }

  ngAfterViewInit() {

    this.tableSource.init({callType: this.callTypeTmpl});
    this.loadData();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.query) {
      this.loadData();
    }
  }

  loadData() {
    if (this.tableSource.hasInitialized && this.query?.startDate && this.query?.endDate) {
      console.log('loadData');
      this.tableSource.load(this.query);
    }
  }

}
