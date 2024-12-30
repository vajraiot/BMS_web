import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { DashBoardService, SiteIdListService, ApplicationUtilitiesService, ConvertersService, GeneralDataSubjectService, LoginRolesSubjectService } from '../../services';
import { SiteIdList, SerialNumberList, GeneralData, DeviceData, DeviceDataWithSiteId, LoginRoles } from 'src/app/interfaces';
import { filter, map, tap } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-real-time-view',
  templateUrl: './real-time-view.component.html',
  styleUrls: ['./real-time-view.component.css'],
})
export class RealTimeViewComponent implements OnInit {
  constructor(
    private dashBoardService: DashBoardService,
    private siteIdListService: SiteIdListService,
    private applicationUtilitiesService: ApplicationUtilitiesService,
    private convertersService: ConvertersService,
    private generalDataSubjectService:GeneralDataSubjectService,
    private loginRolesSubjectService:LoginRolesSubjectService,
  ) {}

  /*******************Variable**************** */
  gblSiteIdListArray: SiteIdList[];
  gblSerialNumberListArray: SerialNumberList[];
  ngmSelectedSiteId = '';
  ngmSelectedSerialNumber = '';
  glbVendorName='--';
bmsDeviceData: DeviceData;
gblDeviceDataWithSiteId: DeviceDataWithSiteId;
  ngOnInit(): void {
    this.applicationUtilitiesService.verifyLogin(); //this is for redirect login page if it is not login
    
    
    this.serviceGetAllSiteIdWithSerialNumbers();

    //this.ngmSelectedSiteId='TSTRANSCO1';    this.ngmSelectedSerialNumber='TSTRANSCOBMS1';
   // this.serviceGetGeneralDataBySiteIdAndSerialNumber();
  }
  /******************************************* */

  /*******************Regular Methods********* */
  

  generalDataProcessing(generalData: GeneralData)
  {
    try{
    
    console.info(" generalDataProcessing is:"+JSON.stringify(generalData));
    generalData.cellThresholdValue= this.getThrsholdValues();
 this.generalDataSubjectService.setGeneralData(generalData);
    if(generalData==null)
    {
      this.gblDeviceDataWithSiteId=null;
      this.bmsDeviceData =null;
      return;  
    }
    
    this.bmsDeviceData = generalData.deviceData[0];
    let lclDeviceDataWithSiteId:DeviceDataWithSiteId={} as DeviceDataWithSiteId;
    lclDeviceDataWithSiteId.siteId=generalData.siteId;
    lclDeviceDataWithSiteId.packetDateTime=generalData.packetDateTime;
    lclDeviceDataWithSiteId.deviceData=generalData.deviceData[0];

    this.gblDeviceDataWithSiteId=lclDeviceDataWithSiteId;
    console.warn("gblDeviceDataWithSiteId is:"+JSON.stringify(this.gblDeviceDataWithSiteId) );
    
  
   
  }
  catch(err)
  {
    this.gblDeviceDataWithSiteId=null;
    console.warn("error occured in realtime"+JSON.stringify(err));
  }
  }
  /******************************************* */

  /*******************Event Methods********* */
  evntSiteIdSelectionChange(value) {
    console.log('check method called......' + value);
    if (value == null) {
      this.ngmSelectedSiteId = '';
      
    }
   else if (value.includes('select')) {
      this.ngmSelectedSiteId = '';
     
    }
else{
    this.ngmSelectedSiteId = value;
}
    let siteidlist = this.applicationUtilitiesService.getSerialNumberListArrayBySiteId(
      value,
      this.gblSiteIdListArray
    );
    if (siteidlist == null) {
      this.gblSerialNumberListArray = [];
      return;
    }
    if (siteidlist.lstSerialNumberList == null) {
      this.gblSerialNumberListArray = [];
      return;
    }
    this.gblSerialNumberListArray = siteidlist.lstSerialNumberList;
  }
  evntSerialNumberChange(value: string) {
    console.log('evntSerialNumberChange is:' + value);
    if (value == null) {
      this.ngmSelectedSerialNumber = '';
      return;
    }
    if (value.includes('select')) {
      console.log('value incldes is:' + value);
      this.ngmSelectedSerialNumber = '';
      return;
    }
    this.ngmSelectedSerialNumber = value;
  }

  test()
  {
    this.loginRolesSubjectService.getLoginRoles().subscribe((dta)=>{
      console.log("loginRolesSubjectService is"+JSON.stringify(dta));
    });
  }
  eventgetGeneralData()
  {
    //this.ngmSelectedSiteId='VIOTRMU002';
    //this.ngmSelectedSerialNumber='GRMU220111412';
//http://183.82.2.109:4582/getInstDataWithTimeLapse?siteId=VIOTTEST02&subtractingMinutes=120
// http://183.82.2.109:4582/getGeneralDataBySiteIdAndSerialNumber?siteId=VIOTRMU002&serialNumber=GRMU220111412


    if (this.ngmSelectedSiteId == '')
    {
      alert("please select the SiteId then proceed");
      return;
    }
    if (this.ngmSelectedSerialNumber == '')
    {
      alert("please select the SerialNumber then proceed");
      return;
    }

    this.serviceGetGeneralDataBySiteIdAndSerialNumber();


    
   try{
    let lclSiteIdList= this.applicationUtilitiesService.getSerialNumberListArrayBySiteId(this.ngmSelectedSiteId,this.gblSiteIdListArray);
    this.glbVendorName=lclSiteIdList.siteLocation.vendorName;
   }
   catch(err)
   {
    this.glbVendorName='--';
   }
  }

  sliderOnChange(value) {
    if (value.checked === true) {
      console.clear();
      console.log('slide on');

      this.routerOnActivate();
    } else {
      console.log('slide off');

      this.routerOnDeactivate();
    }
  }
  interval: any;
  routerOnActivate() {
    this.interval = setInterval(() => {
   
      this.serviceGetGeneralDataBySiteIdAndSerialNumber();
      console.log('autorefresh called..');
    }, 2500);
  }

  routerOnDeactivate() {
    console.log('autorefresh destoyed..');
    clearInterval(this.interval);
  }
  /******************************************* */

  /*****************Service***************** */
  serviceGetAllSiteIdWithSerialNumbers() {
    this.siteIdListService.getAllSiteIdWithSerialNumbers()
    .subscribe(
      (data) => {
        if (data == null) {          return;        }
    
  /*********************Login Role********************* */
   this.loginRolesSubjectService.getLoginRoles()
   .subscribe((lgDta)=>{
      try{
        if (data == null) {
          return;
        }
        this.gblSiteIdListArray = data;
      }catch(err)
      {
        this.gblSiteIdListArray = data;
      }
      
   });
  /***************************************** */

      },
      (err) => {
        console.error(' fetch error : ' + JSON.stringify(err));
      }
    );
  }

 
  serviceGetGeneralDataBySiteIdAndSerialNumber()
  {
   // this.getThrsholdValues();
  this.dashBoardService.getLatestGeneralDataBySiteIdAndSerialNumber(this.ngmSelectedSiteId, this.ngmSelectedSerialNumber)
  .pipe(
    tap(tp=>{
      console.log("serviceGetGeneralDataBySiteIdAndSerialNumber data is:");
      console.log(tp);          
      }),
      map((res:GeneralData)=>{
        res.deviceData.forEach((dvc, dvcInd) => {
        return  dvc.cellVoltageTemperatureData.forEach((cvt,cvtInd)=>{
            if(cvt.cellTemperature>60000)
            {
              cvt.cellTemperature=-1;
            }

            if(cvt.cellVoltage>60)
            {
              cvt.cellVoltage=-1;
            }
          })
        })
        return res;
      }
     
      )
  )
  .subscribe(
  (data) => {

  
  this.generalDataProcessing(data);
  
},
(err) => {
  console.error(" error is:"+JSON.stringify(err));
}
);    
  }
  /**************************************** */

  private getThrsholdValues(){

    //this.ngmSelectedSiteId, this.ngmSelectedSerialNumber
    
    let selectedSite:SiteIdList[] = this.gblSiteIdListArray.filter(element=> {return element.siteId===this.ngmSelectedSiteId});
    let serialNumber: SerialNumberList[]= selectedSite[0].lstSerialNumberList.filter(element=>{return element.serialNumber=== this.ngmSelectedSerialNumber });
    return  serialNumber[0].cellThresholdValue;
  }
}
