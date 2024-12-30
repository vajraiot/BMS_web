import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalVariable } from '../../url/base-url.service';

import {SpecificCellDetails} from '../../interfaces'
@Injectable({
  providedIn: 'root'
})
export class CellDetailsService {

  basedomain: string;
  constructor(private router: Router, private htp: HttpClient) {
    //  this.basedomain="http://127.0.0.1:4582/";
    this.basedomain = GlobalVariable.BASE_API_URL;
    //this.basedomain = environment.apiUrl;
  }

  getSpecificCellDataBySiteIdAndSerialNumber(siteId: string , serialNumber: string,cellNumber:number,numberOfRecords:number) {
   
    let params = new HttpParams();
    params = params.append('siteId', siteId);
    params = params.append('serialNumber', serialNumber);
    params = params.append('cellNumber', cellNumber.toString());
    params = params.append('numberOfRecords', numberOfRecords.toString());

    const api = 'getSpecificCellDataBySiteIdAndSerialNumber';
    return this.htp.get<SpecificCellDetails[]>(this.basedomain + api, { params: params });
  }


  getSpecificCellDataBySiteIdAndSerialNumberBetweenDates(siteId: string , serialNumber: string,cellNumber:number,strStartDate:string,strEndDate:string) {
   
    let params = new HttpParams();
    params = params.append('siteId', siteId);
    params = params.append('serialNumber', serialNumber);
    params = params.append('cellNumber', cellNumber.toString());
    params = params.append('strStartDate', strStartDate);
    params = params.append('strEndDate', strEndDate);

    const api = 'getSpecificCellDataBySiteIdAndSerialNumberBetweenDates';
    return this.htp.get<SpecificCellDetails[]>(this.basedomain + api, { params: params });
  }


  
  downloadCellDataReportUrl(siteId:string,serialNumber:string,cellNumber:number, strStartDate:string,strEndDate:string)
{
  let params = new HttpParams();  
  params = params.append('siteId', siteId);
  params = params.append('serialNumber', serialNumber);
  
  params = params.append('cellNumber',cellNumber.toString());
  params = params.append('strStartDate', strStartDate);
  params = params.append('strEndDate', strEndDate);


  console.log(params);
  let callingAPIMethod="downloadCellDataReport"+"?";
  let completurl=this.basedomain+callingAPIMethod+params;
  console.log("url is:"+completurl);
  return completurl; 
 
}

}
