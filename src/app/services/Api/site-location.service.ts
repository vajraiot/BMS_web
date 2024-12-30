import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../url/base-url.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {SiteIdList, ApiResponseStatus} from '../../interfaces';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SiteLocationService {

  basedomain: string;
  constructor(private router: Router, private htp: HttpClient) {
    //  this.basedomain="http://127.0.0.1:4582/";
    this.basedomain = GlobalVariable.BASE_API_URL;
    //this.basedomain = environment.apiUrl;
  }

  /*******************Http Methods********* */

  addNewLocationToSiteId(siteIdList:SiteIdList) {
    console.clear();
     const ApiMethod = 'postAddNewLocationToSiteId';
     return this.htp.post<ApiResponseStatus>(this.basedomain + ApiMethod, siteIdList);
   }

   updateSiteLocationToSiteId(siteIdList:SiteIdList) {
      
    const ApiMethod = 'updateSiteLocationToSiteId';
    return this.htp.put<ApiResponseStatus>(this.basedomain + ApiMethod, siteIdList);
}

deleteSiteLocationToSiteId(siteId:string) {

  let params = new HttpParams();
  params = params.append('siteId', siteId);

  const api = 'deleteSiteLocationToSiteId';
  return this.htp.delete<ApiResponseStatus>(this.basedomain + api, { params: params });
}

  /***************************************** */
}
