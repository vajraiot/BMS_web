import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUtilitiesService, SiteIdListService } from '../../../services';
import { SiteIdList, SiteLocation, CommnStatus } from '../../../interfaces';

@Component({
  selector: 'app-all-sites-locations',
  templateUrl: './all-sites-locations.component.html',
  styleUrls: ['./all-sites-locations.component.css']
})
export class AllSitesLocationsComponent implements OnInit {

  constructor(private applicationUtilitiesService: ApplicationUtilitiesService,
    private siteIdListService: SiteIdListService) { }

  ngOnInit(): void {
  //this.serviceGetSiteIdList();
  }

title = 'app';
lat = 17.4198;
lng = 78.4006;
  gblsiteIdListArray: SiteIdList[];
  gblSiteLocationArray: SiteLocation[];

  commnStatusArray: CommnStatus[];
  @Input() set receiveCommnstatus(commnStatusArray : CommnStatus[]) {

    if(commnStatusArray==null)
    {
      return;
    }
    if(commnStatusArray.length<1)
    {
      return;
    }
    this.commnStatusArray=commnStatusArray;
    
  }

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
     

 getMarker(commnStatus:CommnStatus)
 {
   if(commnStatus.statusType==1)
   {
   return "assets/images/marker/greenMarker3232.png";
   }
   else
   {
    return "assets/images/marker/RedMarker3232.png";
 
   }
 }

 /******************************Regular***************** */
 getFocusLat(commnStatusArray: CommnStatus[])
 {
try{
return commnStatusArray[0].siteLocation.latitude;
}
catch(error)
{
return this.lat;
}
 }

 getFocusLng(commnStatusArray: CommnStatus[])
 {

  try{
    return commnStatusArray[0].siteLocation.longitude;
    }
    catch(error)
    {
    return this.lng;
    }
 }
 /****************************************************** */
 /**********************service************************ */
 serviceGetSiteIdList()
 {
  this.siteIdListService.getAllSiteIdWithSerialNumbers().subscribe(
    (data)=>{
      
      console.warn("siteidList is:"+JSON.stringify(data));

      this.gblSiteLocationArray = this.applicationUtilitiesService.getSiteLocationsArrayFromSiteIdList(data);
      
    },
    (err)=>{
console.error("error is:"+JSON.stringify(err));
    }
  );
 }
 /**************************************************** */
}
