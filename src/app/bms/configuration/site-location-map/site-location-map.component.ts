import { Component, OnInit, Input } from '@angular/core';
import { SiteIdList, SiteLocation, CommnStatus } from '../../../interfaces';
@Component({
  selector: 'app-site-location-map',
  templateUrl: './site-location-map.component.html',
  styleUrls: ['./site-location-map.component.css']
})
export class SiteLocationMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gblSiteIdList:SiteIdList;
  title = 'app';
lat = 17.4198;
lng = 78.4006;

  @Input() set receivedSiteIdList(siteIdList: SiteIdList)
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
}
