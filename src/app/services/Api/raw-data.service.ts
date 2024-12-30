import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalVariable } from '../../url/base-url.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawDataService {


  basedomain: string;
  constructor(private router: Router, private htp: HttpClient) {
    //  this.basedomain="http://127.0.0.1:4582/";
    this.basedomain = GlobalVariable.BASE_API_URL;
    //this.basedomain = environment.apiUrl;

  }
  /********************Methods******************** */

  GetAllRawPacketByServerTimePg(PageNumber: any, PageSize): Observable<any> {

    let params = new HttpParams();
    params = params.append('page', PageNumber);
    params = params.append('size', PageSize);
    return this.htp.get<any>(this.basedomain + "GetAllRawDataByServerTimePg", { params: params });
  }

  GetRawdataWithSearchingKeywordOrderByServerTimePg(PageNumber: any, PageSize, searchingKeyword) {

    let params = new HttpParams();
    params = params.append('page', PageNumber);
    params = params.append('size', PageSize);
    params = params.append('searchingKeyword', searchingKeyword);
    return this.htp.get<any>(this.basedomain + "GetRawdataWithSearchingKeywordOrderByServerTimePg", { params: params });

  }

  serviceAllLiveParsedDataWithPaging(PageNumber: any, PageSize: any): Observable<any> {
    console.log("page " + PageNumber);
    console.log("pageSize " + PageSize);
    let params = new HttpParams();
    params = params.append('page', PageNumber);
    params = params.append('size', PageSize);

    let callingMethod = "FetchAllLiveData";
    return this.htp.get<any>(this.basedomain + callingMethod, { params: params });

  }
  /*****************************************************************/
}
