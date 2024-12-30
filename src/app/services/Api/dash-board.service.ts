import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalVariable } from '../../url/base-url.service';
import { GeneralData, AllSitesAlarms, CommnStatus } from 'src/app/interfaces';
import { MarginMinutes } from 'src/app/enums';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {
  basedomain: string;
  constructor(private router: Router, private htp: HttpClient) {
    //  this.basedomain="http://127.0.0.1:4582/";
    this.basedomain = GlobalVariable.BASE_API_URL;
    //this.basedomain = environment.apiUrl;
  }

  /**************************Api Methods*********** */

  getLatestPacketData() {
    console.log('entered in getLatestPacketData');
    const api = 'getGeneralDataById';

    return this.htp.get<any>(this.basedomain + api);
  }

  getLatestGeneralDataBySiteId(siteId: any) {
    let params = new HttpParams();
    params = params.append('siteId', siteId);

    const api = 'getGeneralDataBysiteId';
    return this.htp.get<any>(this.basedomain + api, { params: params });
  }

  getLatestGeneralDataBySiteIdAndSerialNumber(siteId: string , serialNumber: string) {
    console.info("getLatestGeneralDataBySiteIdAndSerialNumber siteid is:"+siteId+" serialNumber:"+serialNumber);
    let params = new HttpParams();
    params = params.append('siteId', siteId);
    params = params.append('serialNumber', serialNumber);

    const api = 'getGeneralDataBySiteIdAndSerialNumber';
    return this.htp.get<GeneralData>(this.basedomain + api, { params: params });
  }

  getInstDataWithTimeLapse(siteId:any)
  {
    let params = new HttpParams();
    params = params.append('siteId', siteId);
    params = params.append('subtractingMinutes','120'); //in minutes

    const api = 'getInstDataWithTimeLapse';
    return this.htp.get<any>(this.basedomain + api, { params: params });
    
  }

  getAllSitesAlarmsData()
  {
    const api = 'getAllSitesAlarmsData';
    return this.htp.get<AllSitesAlarms[]>(this.basedomain + api);
    
  }

  getGeneralDataForEachSiteIdAndSerailNumber()
  {
    const api = 'getGeneralDataForEachSiteIdAndSerailNumber';
    return this.htp.get<GeneralData[]>(this.basedomain + api);
    
  }


  getCommnStatus()
  {
    let params = new HttpParams();
    
    params = params.append('marginMinutes',MarginMinutes.Minutes); //in minutes

    const api = 'getCommnStatus';
    return this.htp.get<CommnStatus[]>(this.basedomain + api, { params: params });
    
  }

}
