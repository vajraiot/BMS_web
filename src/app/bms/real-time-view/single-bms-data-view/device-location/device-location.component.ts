import { Component, OnInit, Input } from '@angular/core';
import { GeneralData, SiteIdList } from 'src/app/interfaces';
import { GeneralDataSubjectService, SiteIdListService } from 'src/app/services';

@Component({
  selector: 'app-device-location',
  templateUrl: './device-location.component.html',
  styleUrls: ['./device-location.component.css']
})
export class DeviceLocationComponent implements OnInit {

  constructor(private siteIdListService:SiteIdListService,
    private generalDataSubjectService:GeneralDataSubjectService) { }

  ngOnInit() {
//this.servicessGetSiteIdWithSerialNumbersBySiteId('VIOTTEST02');
this.generalDataSubjectService.getGeneralData().subscribe(
  (dta)=>{
    this.generalDataProcessing(dta);
  }
);
  }

/********************************Global Variable******************************** */
title = 'app';
lat = 17.4198;
lng = 78.4006;
gblSiteIdList: SiteIdList;
/******************************************************************************* */
generalDataProcessing(genearalData:GeneralData)
  {
    try{
    this.getLocationBySiteId(genearalData.siteId);
    }
    catch(err)
    {
      console.error("error occured in all cells pictorial representation.");  
    }
  }  
//@Input() set 
  getLocationBySiteId(siteId:string) {

 this.servicessGetSiteIdWithSerialNumbersBySiteId(siteId);
  }

    siteidListDataProcessing(siteIdList: SiteIdList)
  {
   
    if(siteIdList==null)
    {
      this.gblSiteIdList=null;
      return ;
    }
    if(siteIdList.siteLocation==null)
    {
      this.gblSiteIdList=null;
      return;
    }
    console.warn("siteLocationMap:"+JSON.stringify(siteIdList));
    this.gblSiteIdList=siteIdList;
  }



    /**********************Events*********************************************** */
          /****************close Window*************/
          previous_info_window = null;
          infoWindowOpened = null;
          select_marker(infoWindow) {
            if (this.previous_info_window == null) {
                this.previous_info_window = infoWindow;
            } else {
                this.infoWindowOpened = infoWindow;
                this.previous_info_window.close();
            }
            this.previous_info_window = infoWindow;
          }
          close_window(evnt:any) {
            if (this.previous_info_window != null) {
                this.previous_info_window.close();
            }
          }
          /**************************************** */
          /*************Convertion Methods******* */
          convertOwlDatetimeToCustomDate(str) {

            if(str=='')
              {
                return '';
              }
               
            var date = new Date(str),
             yr= (date.getFullYear()),
              mnth = ("0" + (date.getMonth() + 1)).slice(-2),
              day = ("0" + date.getDate()).slice(-2),
              hour= ("0" + date.getHours()).slice(-2),
              minutes= ("0" + date.getMinutes()).slice(-2),
              seconds= ("0" + date.getSeconds()).slice(-2);
          
             
              return  yr+"-"+mnth+"-"+day +" "+hour+":"+minutes+":"+seconds;
           //  return  day+"/"+mnth+"/"+yr +" "+hour+":"+minutes+":"+seconds;
           // return [date.getFullYear(), mnth, day].join("-");
          }
          /***************************************************** */

    getMarker()
    {
      return "assets/images/marker/greenMarker3232.png";
    }

    getLocationName(dta:SiteIdList)
    {
   if(dta==null)
   {
     return '--';
   }
   if(dta.siteLocation==null)
   {
     return '--';
   }
   return dta.siteLocation.locationName;
    }
    getLongitude(dta:SiteIdList)
    {
      
   if(dta==null)
   {
     return this.lng;
   }
   if(dta.siteLocation==null)
   {
     return this.lng;
   }
   return dta.siteLocation.longitude;
    }
   
   getLatitude(dta:SiteIdList)
   {
     
   if(dta==null)
   {
     return this.lat;
   }
   if(dta.siteLocation==null)
   {
     return this.lat;
   }
   return dta.siteLocation.latitude;
   }
   

   
    /**************************************************************************** */

    /*******************Services************************************************* */
    servicessGetSiteIdWithSerialNumbersBySiteId(siteid: string)
    {
        this.siteIdListService.getSiteIdWithSerialNumbersBySiteId(siteid).subscribe(
         (data)=>{
         this.siteidListDataProcessing(data);
         },
         (err) => {
          console.error(' fetch error : ' + JSON.stringify(err));
        }

        );
        
    }
    /**************************************************************************** */

}
