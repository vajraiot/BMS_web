import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponseStatus, PlainManufacturerDetails } from 'src/app/interfaces';
import { GlobalVariable } from 'src/app/url/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerDetailsService {

 
  basedomain: string;
  constructor(private router: Router, private htp: HttpClient) {
    //  this.basedomain="http://127.0.0.1:4582/";
    this.basedomain = GlobalVariable.BASE_API_URL;
    //this.basedomain = environment.apiUrl;
  }
  
  /*******************Http Methods********* */

  

  /***************For Get All Manufacturer Data*************** */ 
  getManufacturerDetailsBySiteIdAndSerialNumber(siteId:string,serialNumber:string) {
    let params = new HttpParams();
    params = params.append('siteId', siteId);
    params = params.append('serialNumber', serialNumber);
  
    const api = 'getManufacturerDetailsBySiteIdAndSerialNumber';
    return this.htp.get<PlainManufacturerDetails>(this.basedomain + api, { params: params });
 }


  /***************For Get All Manufacturer Data*************** */ 
 getAllManufacturerDetails() {
    console.clear();
     const ApiMethod = 'getAllManufacturerDetails';
     return this.htp.get<PlainManufacturerDetails[]>(this.basedomain + ApiMethod);
   }


   /***************For Create New*************** */ 
 saveManufacturerDetails(PlainManufacturerDetails:PlainManufacturerDetails) {
    console.clear();
     const ApiMethod = 'postSaveManufacturerDetails';
     return this.htp.post<ApiResponseStatus>(this.basedomain + ApiMethod, PlainManufacturerDetails);
   }

   /***************For Updating*************** */ 
 updateManufacturerDetails(PlainManufacturerDetails:PlainManufacturerDetails) {
    console.clear();
     const ApiMethod = 'putUpdateManufacturerDetails';
     return this.htp.put<ApiResponseStatus>(this.basedomain + ApiMethod, PlainManufacturerDetails);
   }

  /***************For Deleting*************** */ 
 deleteSiteLocationToSiteId(siteId:string,serialNumber:string) {

    let params = new HttpParams();
    params = params.append('siteId', siteId);
    params = params.append('serialNumber', serialNumber);
  
    const api = 'deleteManufacturerDetailsBySiteIdAndSerialNumber';
    return this.htp.delete<ApiResponseStatus>(this.basedomain + api, { params: params });
  }


}
