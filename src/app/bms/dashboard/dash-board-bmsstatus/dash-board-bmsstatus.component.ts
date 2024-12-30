import { Component, OnInit, Input } from '@angular/core';
import { GeneralData, DeviceData } from '../../../interfaces';
import { CommnStatusService } from '../../../services';

declare var require: any;
import * as Highcharts from 'highcharts';
import { iif } from 'rxjs';
declare var $:any;

// require('highcharts/modules/series-label')(Highcharts);

require('highcharts/highcharts-more')(Highcharts);

// require('highcharts/highcharts-3d')(Highcharts);

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/highcharts-3d')(Highcharts);

@Component({
  selector: 'app-dash-board-bmsstatus',
  templateUrl: './dash-board-bmsstatus.component.html',
  styleUrls: ['./dash-board-bmsstatus.component.css']
})
export class DashBoardBMSStatusComponent implements OnInit {

  constructor(private commnStatusService: CommnStatusService) {}
  @Input() set receiveGeneralDataArray(generalDataArray : GeneralData[]) {

    console.warn("@Input() of DashBoardBmsStatus");
    
    if(generalDataArray==null)
    {
      return;
    }

    if(generalDataArray.length<1)
    {
      return;
    }
   this.generalDataArray=generalDataArray;

    this.hichartGraph('idBmsStatusGraphs',this.commnStatusService.getBmsStatusChart(generalDataArray));
  }
  generalDataArray: GeneralData[];
  filteredGeneralDataArray: GeneralData[];

  ngOnInit(): void {
    console.warn("ngOnit of DashBoardBmsStatus");
  }

     /***********variables********* */
     genearalDataArray:GeneralData[];
    /******************************** */
    /********************Regular Method***** */
    hichartGraph(divId:string,chart:any)
  {
    //chart.plotOptions.series.events.click(alert("ddd"+this.y));
    Highcharts.chart(divId,chart) ;
  }
  isArrayValid(dta:any[]):boolean
  {
    if(dta==null)
    {
      return false;
    }
    if(dta.length<1)
    {
      return false;
    }
    if(dta[0]==null)
    {
      return false;
    }

    return  true;

  }

  
    totalBms(dta: GeneralData[])
    {
       if(dta==null)
       {
         return '--';
       }
       if(dta.length<1)
       {
         return '--';
       }
       return dta.length;
      
    }
    getLength(dta:any[]):string
    {
      if(!this.isArrayValid(dta))
      {
      return '0';
      }
      return dta.length.toString();
    }
    getStringVoltageArray(dta:GeneralData[],status: number)
    {
      
    if(!this.isArrayValid(dta))
    {
      console.warn("check valid")
      return null;
    }
    let fltDta=dta.filter(
      (fdt)=>
      {
        if (!this.isArrayValid(fdt.deviceData))
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms==null)
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms.stringVoltageLHN==status)
        {
          return true;
        }
        
      }
    );

    return fltDta;
    }


    getCellVoltageArray(dta:GeneralData[],status: number)
    {
      
    if(!this.isArrayValid(dta))
    {
      console.warn("check valid")
      return null;
    }
    let fltDta=dta.filter(
      (fdt)=>
      {
        if (!this.isArrayValid(fdt.deviceData))
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms==null)
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms.cellVoltageLHN==status)
        {
          return true;
        }
        
      }
    );

    return fltDta;
    }


    getSOCArray(dta:GeneralData[],status: boolean)
    {
      
    if(!this.isArrayValid(dta))
    {
      console.warn("check valid")
      return null;
    }
    let fltDta=dta.filter(
      (fdt)=>
      {
        if (!this.isArrayValid(fdt.deviceData))
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms==null)
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms.socLN==status)
        {
          return true;
        }
        
      }
    );

    return fltDta;
    }


    
    getCellTempArray(dta:GeneralData[],status: boolean)
    {
     
    if(!this.isArrayValid(dta))
    {
      console.warn("check valid")
      return null;
    }
    let fltDta=dta.filter(
      (fdt)=>
      {
        if (!this.isArrayValid(fdt.deviceData))
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms==null)
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms.cellTemperatureHN==status)
        {
          return true;
        }
        
      }
    );

    return fltDta;
    }


    getBmsCommArray(dta:GeneralData[],status: boolean) 
    {
     
    if(!this.isArrayValid(dta))
    {
      console.warn("check valid")
      return null;
    }
    let fltDta=dta.filter(
      (fdt)=>
      {
        if (!this.isArrayValid(fdt.deviceData))
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms==null)
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms.bmsSedCommunicationFD==status)
        {
          return true;
        }
        
      }
    );

    return fltDta;
    }


    getAmbientTemperatureArray(dta:GeneralData[],status: boolean) 
    {
     
    if(!this.isArrayValid(dta))
    {
      console.warn("check valid")
      return null;
    }
    let fltDta=dta.filter(
      (fdt)=>
      {
        if (!this.isArrayValid(fdt.deviceData))
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms==null)
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms.ambientTemperatureHN==status)
        {
          return true;
        }
        
      }
    );

    return fltDta;
    }


    getStringCurrentArray(dta:GeneralData[],status: boolean) 
    {
     
    if(!this.isArrayValid(dta))
    {
      console.warn("check valid")
      return null;
    }
    let fltDta=dta.filter(
      (fdt)=>
      {
        if (!this.isArrayValid(fdt.deviceData))
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms==null)
        {
          return false;
        }
        if(fdt.deviceData[0].bmsalarms.stringCurrentHN==status)
        {
          return true;
        }
        
      }
    );

    return fltDta;
    }
    /***************************************** */

    /*******************Event Methods********** */
    eventClckBmsStatus(gndtArray:GeneralData[])
    {
   this.filteredGeneralDataArray=gndtArray;
   $('#idBmsStatusModel').modal('show');
    }
    /****************************************** */

}
