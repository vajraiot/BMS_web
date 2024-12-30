import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../url/base-url.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {SiteIdList} from '../../interfaces';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SiteIdListService {
  basedomain: string;
  constructor(private router: Router, private htp: HttpClient) {
    //  this.basedomain="http://127.0.0.1:4582/";
    this.basedomain = GlobalVariable.BASE_API_URL;
    //this.basedomain = environment.apiUrl;
  }

  /**************************Api Methods*********** */

  getAllSiteIdLIst() {
    const api = 'getAllSiteIdLIst';
    return this.htp.get<string[]>(this.basedomain + api);
  }

  
  getSiteIdWithSerialNumbersBySiteId(siteid: string) {
    let params = new HttpParams();
    params = params.append('siteid', siteid);

    const api = 'getSiteIdWithSerialNumbers';
    return this.htp.get<SiteIdList>(this.basedomain + api, { params: params });
  }

  getAllSiteIdWithSerialNumbers() {
    const api = 'getAllSiteIdWithSerialNumbers';
    return this.htp.get<SiteIdList[]>(this.basedomain + api);
  }



}
