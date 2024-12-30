import { Component, OnInit, Input } from '@angular/core';
import {AllAlarmsService} from '../../../services';
import { AllSitesAlarms, GeneralData } from '../../../interfaces';


declare var $: any;

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
  selector: 'app-all-sites-alarms',
  templateUrl: './all-sites-alarms.component.html',
  styleUrls: ['./all-sites-alarms.component.css']
})
export class AllSitesAlarmsComponent implements OnInit {

  constructor(private allAlarmsService: AllAlarmsService) { }

  ngOnInit(): void {
    this.allAlarms();
  }

  @Input() set receiveGeneralDataArray(generalDataArray:GeneralData[])
  {
    if(generalDataArray==null)
    {
      return;
    }
    this.invokeHighcharts(generalDataArray);
  }
  allAlarms()
  {
    let testingAllAlarmData:Array<AllSitesAlarms>=[];
 
   /* testingAllAlarmData.push({id:1,serialNumber:'122121',siteId:'12121',bankCycleDC:false,ambientTemperatureHN:true,socLN:true,stringVoltageLHN:1,stringCurrentHN:false,bmsSedCommunicationFD:false,cellCommunicationFD:true,cellVoltageLHN:2,cellTemperatureHN:false});
    testingAllAlarmData.push({id:1,serialNumber:'122121',siteId:'12121',bankCycleDC:false,ambientTemperatureHN:true,socLN:true,stringVoltageLHN:1,stringCurrentHN:false,bmsSedCommunicationFD:false,cellCommunicationFD:true,cellVoltageLHN:2,cellTemperatureHN:false});
    testingAllAlarmData.push({id:1,serialNumber:'122121',siteId:'12121',bankCycleDC:false,ambientTemperatureHN:true,socLN:true,stringVoltageLHN:1,stringCurrentHN:false,bmsSedCommunicationFD:false,cellCommunicationFD:true,cellVoltageLHN:2,cellTemperatureHN:false});
    testingAllAlarmData.push({id:1,serialNumber:'122121',siteId:'12121',bankCycleDC:true,ambientTemperatureHN:true,socLN:true,stringVoltageLHN:1,stringCurrentHN:false,bmsSedCommunicationFD:false,cellCommunicationFD:true,cellVoltageLHN:2,cellTemperatureHN:false});
    testingAllAlarmData.push({id:1,serialNumber:'122121',siteId:'12121',bankCycleDC:false,ambientTemperatureHN:true,socLN:true,stringVoltageLHN:1,stringCurrentHN:false,bmsSedCommunicationFD:false,cellCommunicationFD:true,cellVoltageLHN:2,cellTemperatureHN:false});
    testingAllAlarmData.push({id:1,serialNumber:'122121',siteId:'12121',bankCycleDC:true,ambientTemperatureHN:true,socLN:true,stringVoltageLHN:1,stringCurrentHN:false,bmsSedCommunicationFD:false,cellCommunicationFD:true,cellVoltageLHN:2,cellTemperatureHN:false});
    testingAllAlarmData.push({id:1,serialNumber:'122121',siteId:'12121',bankCycleDC:true,ambientTemperatureHN:true,socLN:true,stringVoltageLHN:1,stringCurrentHN:false,bmsSedCommunicationFD:false,cellCommunicationFD:true,cellVoltageLHN:2,cellTemperatureHN:false});
    testingAllAlarmData.push({id:1,serialNumber:'122121',siteId:'12121',bankCycleDC:true,ambientTemperatureHN:true,socLN:true,stringVoltageLHN:1,stringCurrentHN:false,bmsSedCommunicationFD:false,cellCommunicationFD:true,cellVoltageLHN:2,cellTemperatureHN:false});
    testingAllAlarmData.push({id:1,serialNumber:'122121',siteId:'12121',bankCycleDC:true,ambientTemperatureHN:true,socLN:true,stringVoltageLHN:1,stringCurrentHN:false,bmsSedCommunicationFD:false,cellCommunicationFD:true,cellVoltageLHN:2,cellTemperatureHN:false});
    testingAllAlarmData.push({id:1,serialNumber:'122121',siteId:'12121',bankCycleDC:true,ambientTemperatureHN:true,socLN:true,stringVoltageLHN:1,stringCurrentHN:false,bmsSedCommunicationFD:false,cellCommunicationFD:true,cellVoltageLHN:2,cellTemperatureHN:false});*/

 //   console.log("allAlarmsService is;"+JSON.stringify(generalDataArray));
  
  
  }

  invokeHighcharts(generalDataArray:GeneralData[])
{
  this.hichartGraph('idbankCycleDCGraph',this.allAlarmsService.getBankCycleDCChart(generalDataArray));
 
  this.hichartGraph('idambientTemperatureHNGraph',this.allAlarmsService.getAmbientTemperatureHN(generalDataArray));

  this.hichartGraph('idsocLNGraph',this.allAlarmsService.getSocLN(generalDataArray));

  this.hichartGraph('idstringVoltageLHNGraph',this.allAlarmsService.getStringVoltageLHN(generalDataArray));

  
  this.hichartGraph('idstringCurrentHNGraph',this.allAlarmsService.getStringCurrentHN(generalDataArray));

  this.hichartGraph('idbmsSedCommunicationFDGraph',this.allAlarmsService.getBmsSedCommunicationFD(generalDataArray));
  this.hichartGraph('idcellCommunicationFDGraph',this.allAlarmsService.getCellCommunicationFD(generalDataArray));
  this.hichartGraph('idcellVoltageLHNGraph',this.allAlarmsService.getCellVoltageLHN(generalDataArray));
  this.hichartGraph('idcellTemperatureHNGraph',this.allAlarmsService.getCellTemperatureHN(generalDataArray));

}
  hichartGraph(divId:string,chart:any)
  {
    Highcharts.chart(divId,chart) ;
  }
}
