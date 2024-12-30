import { Component, OnInit } from '@angular/core';
import { SiteIdList, SiteLocation } from 'src/app/interfaces';
import { ApplicationUtilitiesService, LoginRolesSubjectService, SiteIdListService, SiteLocationService} from 'src/app/services';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { stringify } from '@angular/compiler/src/util';
declare var $: any;

@Component({
  selector: 'app-site-location',
  templateUrl: './site-location.component.html',
  styleUrls: ['./site-location.component.css'],
})
export class SiteLocationComponent implements OnInit {
  constructor(
    private siteIdListService: SiteIdListService,
    private siteLocationService: SiteLocationService,
    private loginRolesSubjectService:LoginRolesSubjectService,
    private applicationUtilitiesService:ApplicationUtilitiesService,
  ) {}

  ngOnInit(): void {
    this.applicationUtilitiesService.verifyLogin(); //this is for redirect login page if it is not login

    this.refresh();
  }
  /*****************variable************* */
  siteLocationDisplay = [
    'set',
    'siteId',
    'locationName',
    'latitude',
    'longitude',
    'vendorName',
    'batteryAHCapacity',
    
  ];
  siteIdListDataSource:MatTableDataSource<SiteIdList>;
  gblSiteIdArray:SiteIdList[];
  selectedRowIndex=-1;
  selectedRowRecord:SiteIdList;
  gblSelectedSiteId:string;

glbSiteId:SiteIdList;

gblLocationName='';
gblLatitude:number;
gblLongitude:number;
gblVendorName='';
gblbatteryAHCapacity='';



  /***************************************** */

  /**************Event Method********************* */
  evntRefresh()
  {
    this.refresh();
  }
  getRecord(coloumnData: SiteIdList) {
    console.warn("row clicked..."+coloumnData.id);
    this.selectedRowIndex = coloumnData.id;
    this.selectedRowRecord=coloumnData;
  }

  evntAddNewLocationModel()
  {

    this.gblLocationName='';
    this.gblLatitude=null;
    this.gblLongitude=null;
    this.gblVendorName='';
    this.gblbatteryAHCapacity='';
    $('#idAddNewLocationDetails').modal('show');
  }
  eventAddNewLocationDetails()
  {
    //let lclSiteLocation:SiteLocation={ locationName:this.gblLocationName,latitude:this.gblLatitude,longitude:this.gblLongitude };
  
  let lcldSiteLocation : SiteLocation={} as SiteLocation;
  lcldSiteLocation.latitude=this.gblLatitude;
  lcldSiteLocation.locationName=this.gblLocationName;
  lcldSiteLocation.longitude=this.gblLongitude;
  lcldSiteLocation.vendorName=this.gblVendorName;
  lcldSiteLocation.batteryAHCapacity=this.gblbatteryAHCapacity;

  let lclSiteIdList:SiteIdList={} as SiteIdList;
  lclSiteIdList.siteId= this.gblSelectedSiteId;
  lclSiteIdList.siteLocation= lcldSiteLocation;

  this.serviceAddNewLocationToSiteId(lclSiteIdList);
//  console.log(" tsinting:"+JSON.stringify(lclSiteIdList));

  }
  evntUpdateModel(row:SiteIdList)
  {

    if(row==null)
    {
      alert("row is invalid.");
    }
    this.gblSelectedSiteId=row.siteId;
    this.gblLocationName=row.siteLocation.locationName;
    this.gblLatitude=row.siteLocation.latitude;
    this.gblLongitude=row.siteLocation.longitude;
    this.gblVendorName=row.siteLocation.vendorName;
    this.gblbatteryAHCapacity=row.siteLocation.batteryAHCapacity;

    $('#idUpdateSiteLocationDetails').modal('show');
   
  }

  eventUpdateSiteLocation()
  {
  
    
  let lcldSiteLocation : SiteLocation={} as SiteLocation;
  lcldSiteLocation.latitude=this.gblLatitude;
  lcldSiteLocation.locationName=this.gblLocationName;
  lcldSiteLocation.longitude=this.gblLongitude;
  lcldSiteLocation.vendorName=this.gblVendorName;
  lcldSiteLocation.batteryAHCapacity=this.gblbatteryAHCapacity;

  let lclSiteIdList:SiteIdList={} as SiteIdList;
  lclSiteIdList.siteId= this.gblSelectedSiteId;
  lclSiteIdList.siteLocation= lcldSiteLocation;
  
  this.serviceUpdateSiteLocationToSiteId(lclSiteIdList);
  
  }

  evntDeleteRecord(row:SiteIdList)
  {
if(row==null)
{
  alert("please select the row.");
  return;
}


var answer = window.confirm("Would you like to delete Record for siteId:" + row.siteId);
if (answer) {
  this.serviceDeleteSiteLocationToSiteId(row.siteId);
  
}
else {
return;
}


  }
  /*********************************************** */
  /**************Regular Method**************** ***/
  getSiteId(dta:SiteIdList)
  {
   if(dta==null)
   {
     return null;
   }
  }

  refresh()
  {
    this.serviceGetAllSiteIdWithSerialNumbers();
  }
  AllSiteIdWithSerialNumbersDataProcessing(dta:SiteIdList[])
  {
   if(dta==null)
   {
     return;
   }

   this.gblSiteIdArray=dta;

   this.siteIdListDataSource = new MatTableDataSource(dta.filter(d=>d.siteLocation!=null));
  if(this.selectedRowIndex==-1)
  {
    let lclDta=dta.filter(d=>d.siteLocation!=null);
    if(lclDta.length<1)
    {
      
    this.selectedRowIndex=-1;
    this.selectedRowRecord=null;
      return;
    }
    this.selectedRowIndex=lclDta[0].id;
    this.selectedRowRecord=lclDta[0];
  }
  else
  {
    
    let lclDta=dta.filter(d=>d.siteLocation!=null);
    if(lclDta.length<1)
    {
      
    this.selectedRowIndex=-1;
    this.selectedRowRecord=null;
      return;
    }
let lclsiteIdlist=lclDta.filter(d=>d.id==this.selectedRowIndex);
if(lclsiteIdlist.length>0)
{

  this.selectedRowIndex=lclsiteIdlist[0].id;
  this.selectedRowRecord=lclsiteIdlist[0];
}
  
  }
  
  }
  /******************************************* ***/

  /**************************Services********************* */
  serviceGetAllSiteIdWithSerialNumbers()
  {
    this.siteIdListService.getAllSiteIdWithSerialNumbers().subscribe(
      (data)=>{
                /***************loginrole********* */
   this.loginRolesSubjectService.getLoginRoles()
   .subscribe((lgDta)=>{
      // try{
        
      //  if(lgDta.lstLoginCredentials[0].id===2)
      //  {
      //   this.AllSiteIdWithSerialNumbersDataProcessing((data)=data.filter(d=>{ 
      //     if(d.siteId=='TSTRANSCO1')
      //     {
      //       return true;
      //     }
      //   }) )
      //  }
      //  else
      //  {
      //   this.AllSiteIdWithSerialNumbersDataProcessing(data);
      //  }
      // }catch(err)
      // {
      //   this.AllSiteIdWithSerialNumbersDataProcessing(data);
      // }

      this.AllSiteIdWithSerialNumbersDataProcessing(data);
      
   });
    /******************************************** */

      },
      (err)=>{
console.error("error occured:"+JSON.stringify(console.error()));
        
      } );
    }


  serviceAddNewLocationToSiteId(siteIdList:SiteIdList)
  {
    this.siteLocationService.addNewLocationToSiteId(siteIdList).subscribe(
      (data)=>{
         alert(data.message);
         this.refresh();
      },
      (err)=>{
console.error("error occured:"+JSON.stringify(console.error()));
        
      } );
  }

  serviceUpdateSiteLocationToSiteId(siteIdList:SiteIdList)
  {
    this.siteLocationService.updateSiteLocationToSiteId(siteIdList).subscribe(
      (data)=>{
        alert(data.message);
        this.refresh();
      },
      (err)=>{
    console.error("error occured:"+JSON.stringify(console.error()));
        
      } );
  }

  
  serviceDeleteSiteLocationToSiteId(siteId: string)
  {
    this.siteLocationService.deleteSiteLocationToSiteId(siteId).subscribe(
      (data)=>{
        alert(data.message);
        if(data.value==1)
        {
          this.selectedRowIndex=-1;
          this.selectedRowRecord=null;
        }
        this.refresh();
      },
      (err)=>{
    console.error("error occured:"+JSON.stringify(console.error()));
        
      } );
  }
   
  /****************************************************** */
}
