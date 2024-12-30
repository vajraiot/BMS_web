import { Component, OnInit, Input } from '@angular/core';
import {ConvertersService} from '../../../services/CommonUtilities/converters.service';


import { InstantaneousGraphsService } from '../../../services';
import { DashBoardService } from '../../../services/Api/dash-board.service';
import * as Highcharts from 'highcharts';
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
  selector: 'app-instantaneous-data',
  templateUrl: './instantaneous-data.component.html',
  styleUrls: ['./instantaneous-data.component.css']
})
export class InstantaneousDataComponent implements OnInit {
  
  
  constructor(private dashBoardService:DashBoardService,
      private instantaneousGraphsService: InstantaneousGraphsService) { }

  ngOnInit(): void {
   
  }

  
  @Input() set receivingSiteId(siteId: any) {
    if((siteId==null)||(siteId==''))
    {
      return;
    }
    //siteid='VIOTTEST02';
    console.log("receivingSiteId is:"+siteId);
   this.serviceGetInstDataWithTimeLapse(siteId);
  }
  /*************service********************** */
  
  serviceGetInstDataWithTimeLapse(siteId){
    this.dashBoardService.getInstDataWithTimeLapse(siteId).subscribe(
      (data) => {
        Highcharts.chart('idTemperature', this.instantaneousGraphsService.higchartTemperatureChart(data));
        
        Highcharts.chart('idCurrent', this.instantaneousGraphsService.higchartCurrent(data));
        Highcharts.chart('idStringVoltage', this.instantaneousGraphsService.higchartStringVoltage(data));
  
      },
      (err) => {
        console.log(' fetch error : ' + err);
      }
       );
     }
  /****************************************** */
}
