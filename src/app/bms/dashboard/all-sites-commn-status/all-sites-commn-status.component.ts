import { Component, OnInit, Input } from '@angular/core';
import { CommnStatusService } from '../../../services';

declare var $:any;

import * as Highcharts from 'highcharts';
import { CommnStatus, GeneralData } from 'src/app/interfaces';
declare var require: any;

//require('highcharts/modules/series-label')(Highcharts);

require('highcharts/highcharts-more')(Highcharts);

//require('highcharts/highcharts-3d')(Highcharts);

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/highcharts-3d')(Highcharts);


@Component({
  selector: 'app-all-sites-commn-status',
  templateUrl: './all-sites-commn-status.component.html',
  styleUrls: ['./all-sites-commn-status.component.css'],
})
export class AllSitesCommnStatusComponent implements OnInit {
  constructor(private commnStatusService: CommnStatusService) {}

  ngOnInit(): void {
    //  Highcharts.chart('idAllSitesCommnStatus', opt );

   // this.highchartCommnStatus();

   
  }

  @Input() set receiveCommnstatus(commnStatusArray : CommnStatus[]) {

    if(commnStatusArray==null)
    {
      return;
    }
    
    
    
    this.commnStatusArray=commnStatusArray;
    this.highchartCommnStatus();
  }
  /***************************Variables********************************* */
  commnStatusArray:CommnStatus[];
  gblData:any;
  genearalDataArray : GeneralData[];
  /********************************************************************* */

  /*************regular mehtods*********** */
  TotalInstalationcount(dta:CommnStatus[])
  {
if(dta==null)
{
  return '--';
}
return dta.length;
  }

  getArraryLength(dta:any[])
  {
    if(dta==null)
    {
      return '0';
    }
    return dta.length.toString();
  }
  getGeneralDataFromCommnStatus(dta:CommnStatus[])
  {
    if(dta==null)
    {
      return null;
    }
   let rtnGeneralData:Array<GeneralData>=[];
   for(let i=0;i<dta.length;i++)
   {
     if(dta[i]==null)
     {
       continue;
     }
    rtnGeneralData.push(dta[i].generalData);

   }

   return rtnGeneralData;
  }
  commnSiteIdcount(dta:CommnStatus[])
  {
    if(dta==null)
    {
      return null;
    }
    let rcd=dta.filter(dta=>dta.statusType==1);  
   return rcd;
  }

  
  NotCommnSiteIdcount(dta:CommnStatus[])
  {
    if(dta==null)
    {
      return null;
    }
    let rcd=dta.filter(dta=>dta.statusType==0);  
    rcd.length;
    return rcd;
  }

  /***************************************** */

  highchartCommnStatus() {
    let opt = this.commnStatusService.getHighchartCommnStatus(this.commnStatusArray);
   
    Highcharts.chart('idCommnGraph', opt);
  }
   extMethod(options)
{
  alert("calling ext method"+options);
}

  hichartGraph(divId:string,chart:any)
  {
    //chart.plotOptions.series.events.click(alert("ddd"+this.y));
    Highcharts.chart(divId,chart) ;
  }

  /*********************event method********* */
  evntClckStatus(commnStatusArray:CommnStatus[])
  {
    this.genearalDataArray=this.getGeneralDataFromCommnStatus(commnStatusArray);
    $('#idSiteStatus').modal('show');
  }
  /********************************************** */

}
