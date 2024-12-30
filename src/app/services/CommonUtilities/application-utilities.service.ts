import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {ConvertersService} from '../CommonUtilities/converters.service';
import { SiteIdList, SiteLocation, SpecificCellDetails } from 'src/app/interfaces';
import { Router } from '@angular/router';
import { LoginRolesSubjectService } from '../subjects/login-roles-subject.service';
import { ComponentPathEnum } from 'src/app/enums';

@Injectable({
  providedIn: 'root',
})
export class ApplicationUtilitiesService {
  constructor(private convertersService: ConvertersService,
    private router: Router,
    
    private loginRolesSubjectService:LoginRolesSubjectService,) {}

  public  verifyLogin()
  {
    this.loginRolesSubjectService.getLoginRoles().subscribe(
      (dta)=>{
        if(dta==null)
        {
        this.router.navigate(['/' + ComponentPathEnum.Login3]);
        }
      }
    );
  }

 public getSiteLocationsArrayFromSiteIdList(siteIdListArray: SiteIdList[]): SiteLocation[]
    {
      let lclSiteLocationArray : Array<SiteLocation> = [];

      if(siteIdListArray!=null) {
      for(let i=0;i<siteIdListArray.length; i++)
      {
        let  instSiteLocation=siteIdListArray[i].siteLocation;
        if(instSiteLocation!=null)
        {
          lclSiteLocationArray.push(instSiteLocation);
        }
      }
      }
      return lclSiteLocationArray;

    }



    getSerialNumberListArrayBySiteId(
      siteid: string,
      siteIdListArray: SiteIdList[]
    ): SiteIdList {
      let rtnSiteIdList: SiteIdList;
      if (siteid == null) {
        return null;
      }
      if (siteid == '') {
        return null;
      }
      if (siteIdListArray == null) {
        return null;
      }
      for (let i = 0; i < siteIdListArray.length; i++) {
        if (siteIdListArray[i] != null)
          if (siteIdListArray[i].siteId == siteid) {
            rtnSiteIdList = siteIdListArray[i];
            break;
          }
      }
      return rtnSiteIdList;
    }

    getCellVoltageArray(specificCellDetailsArray: SpecificCellDetails[]){
      let nmbrArray:number[]=[];
     specificCellDetailsArray.forEach((dta,index)=>{
      nmbrArray.push(dta.cellVoltage);
     })
      return nmbrArray;
    }
    getCellTemperatureArray(specificCellDetailsArray: SpecificCellDetails[]){
      let nmbrArray:number[]=[];
     specificCellDetailsArray.forEach((dta,index)=>{
      nmbrArray.push(dta.cellTemperature);
     })
      return nmbrArray;
    }

    getCellPacketTimeArray(specificCellDetailsArray: SpecificCellDetails[]){
      let strDateArray:string[]=[];
     specificCellDetailsArray.forEach((dta,index)=>{
      strDateArray.push(this.convertOwlDatetimeToCustomDate(dta.packetDateTime));
     })
      return strDateArray;
    }

    convertOwlDatetimeToCustomDate(str) { //input-2020-07-02T06:16:43.298+0000 to output 2020-02-11 00:29:04

      if (str == '') {
        return '';
      }
  
      var date = new Date(str),
        yr = (date.getFullYear()),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2),
        hour = ("0" + date.getHours()).slice(-2),
        minutes = ("0" + date.getMinutes()).slice(-2),
        seconds = ("0" + date.getSeconds()).slice(-2);
  
  
      return yr + "-" + mnth + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
      //  return  day+"/"+mnth+"/"+yr +" "+hour+":"+minutes+":"+seconds;
      // return [date.getFullYear(), mnth, day].join("-");
    }
}
