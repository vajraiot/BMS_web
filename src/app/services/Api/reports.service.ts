import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../url/base-url.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {CellParam,StringParam, ContentPageMaker, DayWiseData} from '../../interfaces';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  basedomain: string;
  constructor(private router: Router, private htp: HttpClient) {
    //  this.basedomain="http://127.0.0.1:4582/";
    this.basedomain = GlobalVariable.BASE_API_URL;
    //this.basedomain = environment.apiUrl;
  }

  /*********************************HTTP Methods******** */

  /**********************String Data**************** */
  getHistoricalStringDataWithPg(pageNumber: number, pageSize: number, serialNumber: string, siteId: string,strStartDate:string,strEndDate:string) {
    let params = new HttpParams();
    params = params.append('page', pageNumber.toString());
    params = params.append('size', pageSize.toString());

    params = params.append('serialNumber', serialNumber);
    params = params.append('siteId', siteId);
    params = params.append('strStartDate', strStartDate);
    params = params.append('strEndDate', strEndDate);
    

    const api = 'getHistoricalStringDataBySiteidAndSerialNumberBetweenDateswithPg';
    return this.htp.get<ContentPageMaker>(this.basedomain + api, { params: params });
  }


  /**********************Cell Data**************** */
  getHistoricalCellDataWithPg(pageNumber: number, pageSize: number, serialNumber: string, siteId: string,strStartDate:string,strEndDate:string) {
    let params = new HttpParams();
    params = params.append('page', pageNumber.toString());
    params = params.append('size', pageSize.toString());

    params = params.append('serialNumber', serialNumber);
    params = params.append('siteId', siteId);
    params = params.append('strStartDate', strStartDate);
    params = params.append('strEndDate', strEndDate);
    

    const api = 'getHistoricalCellDataBySiteidAndSerialNumberBetweenDateswithPg';
    return this.htp.get<ContentPageMaker>(this.basedomain + api, { params: params });
  }

  
  
  /**********************Alarms Data**************** */
  getHistoricalAlarmsDataWithPg(pageNumber: number, pageSize: number, serialNumber: string, siteId: string,strStartDate:string,strEndDate:string) {
    let params = new HttpParams();
    params = params.append('page', pageNumber.toString());
    params = params.append('size', pageSize.toString());

    params = params.append('serialNumber', serialNumber);
    params = params.append('siteId', siteId);
    params = params.append('strStartDate', strStartDate);
    params = params.append('strEndDate', strEndDate);
    

    const api = 'getHistoricalAlarmsDataBySiteidAndSerialNumberBetweenDateswithPg';
    return this.htp.get<ContentPageMaker>(this.basedomain + api, { params: params });
  }


  getDaywiseReports(serialNumber: string, siteId: string,strStartDate:string,strEndDate:string) {
    let params = new HttpParams();
    
    params = params.append('serialNumber', serialNumber);
    params = params.append('siteId', siteId);

    params = params.append('strStartDate', strStartDate);
    params = params.append('strEndDate', strEndDate);
    console.log(params);
    const api = 'getDaywiseReports';
    return this.htp.get<DayWiseData[]>(this.basedomain + api, { params: params });
  }

  /****************************************************** */

  /********************For Return Downloadable Url*********************** */
  getdownloadHistoricalStringReportUrl(siteId:string,serialNumber:string,strStartDate:string, strEndDate:string)
{
  let params = new HttpParams();  
  params = params.append('siteId', siteId);
  params = params.append('serialNumber', serialNumber);
  params = params.append('strStartDate', strStartDate);
  params = params.append('strEndDate', strEndDate);

  console.log(params);
  let callingAPIMethod="downloadHistoricalStringReport"+"?";
  let completurl=this.basedomain+callingAPIMethod+params;
  console.log("url is:"+completurl);
  return completurl; 
 
}



getdownloadHistoricalCellReportUrl(siteId:string,serialNumber:string,strStartDate:string, strEndDate:string)
{
  let params = new HttpParams();  
  params = params.append('siteId', siteId);
  params = params.append('serialNumber', serialNumber);
  params = params.append('strStartDate', strStartDate);
  params = params.append('strEndDate', strEndDate);

  console.log(params);
  let callingAPIMethod="downloadHistoricalCellsReport"+"?";
  let completurl=this.basedomain+callingAPIMethod+params;
  console.log("url is:"+completurl);
  return completurl; 
 }



getdownloadHistoricalAlarmsReportUrl(siteId:string,serialNumber:string,strStartDate:string, strEndDate:string)
{
  let params = new HttpParams();  
  params = params.append('siteId', siteId);
  params = params.append('serialNumber', serialNumber);
  params = params.append('strStartDate', strStartDate);
  params = params.append('strEndDate', strEndDate);

  console.log(params);
  let callingAPIMethod="downloadHistoricalAlarmsReport"+"?";
  let completurl=this.basedomain+callingAPIMethod+params;
  console.log("url is:"+completurl);
  return completurl; 
 }


 
getdownloadDaywiseReportsUrl(siteId:string,serialNumber:string,strStartDate:string, strEndDate:string)
{
  let params = new HttpParams();  
  params = params.append('siteId', siteId);
  params = params.append('serialNumber', serialNumber);
  params = params.append('strStartDate', strStartDate);
  params = params.append('strEndDate', strEndDate);

  console.log(params);
  let callingAPIMethod="downloadDaywiseReports"+"?";
  let completurl=this.basedomain+callingAPIMethod+params;
  console.log("url is:"+completurl);
  return completurl; 
 }




}
