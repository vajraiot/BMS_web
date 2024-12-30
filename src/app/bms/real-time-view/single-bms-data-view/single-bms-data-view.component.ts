import { Component, OnInit, Input } from '@angular/core';
import { DeviceData, BMSAlarms, CellVoltageTemperatureData, DeviceDataWithSiteId } from 'src/app/interfaces';
import {DashBoardService, ConvertersService, GeneralDataSubjectService} from '../../../services';
import * as Highcharts from 'highcharts';

declare var $:any;
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
  selector: 'app-single-bms-data-view',
  templateUrl: './single-bms-data-view.component.html',
  styleUrls: ['./single-bms-data-view.component.css']
})
export class SingleBmsDataViewComponent implements OnInit {

  constructor(private dashBoardService:DashBoardService,
    public convertersService: ConvertersService,
    private generalDataSubjectService:GeneralDataSubjectService) { 
    //this.alarmData={} as BMSAlarms;
  }
  bmsDeviceData: DeviceData;
  //@Input('receivedBmsDeviceData') bmsDeviceData:DeviceData;
  //@Input() set 
  receivedBmsDeviceData(deviceDataWithSiteId: DeviceDataWithSiteId)
  {
   // console.warn("inside the input is:"+JSON.stringify(deviceDataWithSiteId));
    
    if(deviceDataWithSiteId==null)
    {
      return;
    }

  this.dataDistribution(deviceDataWithSiteId);
  }
  
  gblBmsDeviceData: DeviceData;
  gblStrSiteId:string;

  alarmData: BMSAlarms;
  gblCellVoltageTemperatureData: CellVoltageTemperatureData[];
  

  ngOnInit(): void {
 this.generalDataSubjectService.getGeneralData();
  }

  dataDistribution(deviceDataWithSiteId: DeviceDataWithSiteId)
  {
     this.bmsDeviceData =deviceDataWithSiteId.deviceData;
    this.gblStrSiteId=deviceDataWithSiteId.siteId;

    if(this.bmsDeviceData == undefined)
   {
     return;
   }
   if(this.bmsDeviceData==null)
   {
     return ;
   }
    
    this.gblBmsDeviceData = this.bmsDeviceData;
    
    this. alarmData=this.bmsDeviceData.bmsalarms;
   // console.log("dataDistribution alarmsData is:"+JSON.stringify(bmsDeviceData));
    this.gblCellVoltageTemperatureData= this.bmsDeviceData.cellVoltageTemperatureData;
  
  }

  secondsTohhmmss(seconds)
  {
    console.log("soconds  is :"+seconds);
    return this.convertersService.secondsTohhmmss(seconds);
  }
  /********************Event******************* */
  evntAllInstDataClick()
{
  $('#allInstDatapopupModel').modal('show');
  
}

evntToOpenModel()
{
  $('#idAllCellPictorialModel').modal('show');
}
  /********************************************* */
  /********************Service***************** */
  serviceGetGeneralDataBySiteIdAndSerialNumber()
  {
this.dashBoardService.getLatestGeneralDataBySiteIdAndSerialNumber('VIOTTEST02','VAJRAWBMS0003').subscribe(
(data)=>{

  if(data==null)
  {
    return;
  }
  //if(data.deviceData.length>0)
  //this.dataDistribution(data.deviceData[0]);

},
(err)=>{}
);    
  }
  /**************************************************** */

}
