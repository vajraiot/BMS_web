import { Component, OnInit, Input } from '@angular/core';
import { ConvertersService } from '../../../services/CommonUtilities/converters.service';
import {InstantaneousGraphsService} from '../../../services';
declare var $:any;

import * as Highcharts from 'highcharts';
import { DashBoardService } from '../../../services/Api/dash-board.service';
import { from } from 'rxjs';
declare var require: any;

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
require('highcharts/modules/heatmap')(Highcharts);
require('highcharts/modules/treemap')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);

//require('highcharts/modules/series-label')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);

@Component({
  selector: 'app-testing4',
  templateUrl: './testing4.component.html',
  styleUrls: ['./testing4.component.css'],
})
export class Testing4Component implements OnInit {
  constructor(private convertersService: ConvertersService,
     private DashBoardService: DashBoardService,
     private instantaneousGraphsService:InstantaneousGraphsService) {}

  ngOnInit(): void {
//  this.AllJqueryMethods();
    this.ServiceGetInstDataWithTimeLapse();
  }
  @Input() set receivingCellData(cellsData: any) {}
  /**************jQuery Method********** */
  AllJqueryMethods()
  {
this.pophoverJquery();
  }
  pophoverJquery()
  {
    
    //$('[data-toggle="popover"]').popover();

    /*$(function () {
      $('.example-popover').popover({
        container: 'body'
      })
    }) */

  }
  tooltipeJquery() {
    /*$(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })*/
  }
  /*********************************************** */

  evenFMSDataGraph()
{
  $('#myModal').modal('show');
  
}
  /*----------------------Use HighCharts-------------------------------------- */
  StringVoltageGraph(dta:any) {
    //.chart('container', this.instantaneousGraphsService.higchartStringVoltage(dta));
  }
  /*-------------------------------------------------------------------------- */

/************************service Method************************ */
ServiceGetInstDataWithTimeLapse(){
this.DashBoardService.getInstDataWithTimeLapse('VIOTTEST02').subscribe(
  (data) => {
    //this.latestDataProcessing(data);
    this.StringVoltageGraph(data);
  },
  (err) => {
    console.log(' fetch error : ' + err);
  }
   );
 }
}
