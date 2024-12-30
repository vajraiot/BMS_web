import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CellThresholdValuesEnum } from 'src/app/enums';
import { PlainManufacturerDetails, SerialNumberList, SiteIdList } from 'src/app/interfaces';
import { CellThresholdValues } from 'src/app/interfaces/cell-threshold-values';
import { ApplicationUtilitiesService, LoginRolesSubjectService, ManufacturerDetailsService, ManufacturerFieldNamesService, SiteIdListService } from 'src/app/services';
declare var $: any;

@Component({
  selector: 'app-manufacturer-details',
  templateUrl: './manufacturer-details.component.html',
  styleUrls: ['./manufacturer-details.component.css']
})
export class ManufacturerDetailsComponent implements OnInit {

  constructor(private manufacturerDetailsService:ManufacturerDetailsService,private siteIdListService:SiteIdListService,
    private loginRolesSubjectService:LoginRolesSubjectService,
    private applicationUtilitiesService:ApplicationUtilitiesService,
    ) { }

  ngOnInit(): void {
   this.applicationUtilitiesService.verifyLogin(); //this is for redirect login page if it is not login
    this.pmd.cellThresholdValue= {} as CellThresholdValues;
  this.evntRefresh();
  }

  /***********************************Variables********************** */

  
   manufacturerFieldNamesService=ManufacturerFieldNamesService;
  pmdArray:PlainManufacturerDetails[]=[];
  pmd:PlainManufacturerDetails ={} as PlainManufacturerDetails;
 // cellThresholdValue: CellThresholdValues={} as CellThresholdValues;

  selectedRowIndex=-1;
  plainManufacturerDetailsDisplay = [
    'set',
    'siteId',
    'serialNumber',
    'firstUsedDate',
    'batterySerialNumber',
    'batteryBankType',
    'ahCapacity',
    'manifactureName',
    'individualCellVoltage',
    'designVoltage',
    
    
  ];
  plainManufacturerDetailsDataSource:MatTableDataSource<PlainManufacturerDetails>;

  gblSiteIdListArray: SiteIdList[];
  gblSerialNumberListArray: SerialNumberList[];
  ngmSelectedSiteId = '';
  ngmSelectedSerialNumber = '';
  
   //manufacturerFieldNamesService=ManufacturerFieldNamesService;

  /****************************************************************** */

  /***********************************Event Methods***************** */
   /*------------Table Operations----------------- */
   evntRefresh()
   {
    this.servicesGetAllManufacturerDetails();
    this.serviceGetAllSiteIdWithSerialNumbers();
   }
   evntAddNewLocationModel()
   {
    $('#idAddManufacturerDetails').modal('show');
   }
   evntUpdateModel(row:PlainManufacturerDetails)
   {
     console.log(row);

     this.pmd=row;
     if(!row.cellThresholdValue){
      row.cellThresholdValue={} as CellThresholdValues;
     }
    $('#idUpdateManufacturerDetails').modal('show');

   }
   evntDeleteRecord(row:PlainManufacturerDetails)
   {
    if(row==null)
    {
      alert("please select the row.");
      return;
    }
    var answer = window.confirm("Would you like to delete Record With SiteName:" + row.siteId+" SerialNumber:"+row.serialNumber);
    if (answer) {
      this.serviceDeleteSiteLocationToSiteId(row.siteId,row.serialNumber);      
    }
    else {
    return;
    }
   }
   getRecord(row:PlainManufacturerDetails)
   {
    this.selectedRowIndex = row.id;
   console.log(row);
   }
 //this is for creating new Manufacturer Details
   eventAddNewManufacturerDetails() 
   {
     this.pmd.siteId=this.ngmSelectedSiteId;
     this.pmd.serialNumber=this.ngmSelectedSerialNumber;
     //this.pmd.cellThresholdValue=this.cellThresholdValue

   console.log(this.pmd);
   this.servicesSaveManufacturerDetails(this.pmd);
   }

   //this is for creating new Manufacturer Details
   eventUpdateExistingManufacturerDetails()
   {
  
    //this.pmd.cellThresholdValue=this.cellThresholdValue;
     this.serviceUpdateManufacturerDetails(this.pmd);
   }
   /*--------------------------------------------- */
   /*-------------SiteId And SerialNumber--------- */
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
   /*---------------------------------------------- */
  /******************************************************************* */

  /***********************************Regular Methods***************** */
  manufacturerDetailsDataProcessing(dtaArray:PlainManufacturerDetails[])
  {
    this.pmdArray=dtaArray; 
    this.plainManufacturerDetailsDataSource=new MatTableDataSource(dtaArray);
    console.log(dtaArray);
  }
  /****************************************************************** */
  /*******************************Services********************** */
  servicesGetAllManufacturerDetails()
  {
    this.manufacturerDetailsService.getAllManufacturerDetails()
    .subscribe(
    (data)=>{
      if (data == null) {          return;        }
     /*********************Login Role********************* */
   this.loginRolesSubjectService.getLoginRoles()
   .subscribe((lgDta)=>{
      // try{
        
      //  if(lgDta.lstLoginCredentials[0].id===2)
      //  {
      //  let  lclfilteredData=data.filter(d=>{ 
      //     if(d.siteId=='TSTRANSCO1')
      //     {
      //       return true;
      //     }
      //   })
        
      //   this.manufacturerDetailsDataProcessing(lclfilteredData);
      //  }
      //  else
      //  {
      //   this.manufacturerDetailsDataProcessing(data);
      //  }
      // }catch(err)
      // {
      //   this.manufacturerDetailsDataProcessing(data);
      // }
       this.manufacturerDetailsDataProcessing(data);
      
   });
  /***************************************** */
        
        
        
       
      
     
      
    }
    );
  }

  servicesSaveManufacturerDetails(pmd:PlainManufacturerDetails)
  {
    this.manufacturerDetailsService.saveManufacturerDetails(pmd)
    .subscribe(
    (data)=>{
      alert(data.message);      
      this.evntRefresh();
    }
    );
  }

  serviceUpdateManufacturerDetails(pmd:PlainManufacturerDetails)
  {
    this.manufacturerDetailsService.updateManufacturerDetails(pmd)
    .subscribe(
    (data)=>{
      alert(data.message);      
      this.evntRefresh();
    }
    );
  }

  serviceDeleteSiteLocationToSiteId(siteId:string,serialNumber:string)
  {
    this.manufacturerDetailsService.deleteSiteLocationToSiteId(siteId,serialNumber)
    .subscribe(
    (data)=>{
     alert(data.message);   
     this.evntRefresh();   
    }
    );
  }


  serviceGetAllSiteIdWithSerialNumbers() {
    this.siteIdListService.getAllSiteIdWithSerialNumbers()
    .subscribe(
      (data) => {
        if (data == null) {          return;        }
    
  /*********************Login Role********************* */
   this.loginRolesSubjectService.getLoginRoles()
   .subscribe((lgDta)=>{
     // try{
        
      //  if(lgDta.lstLoginCredentials[0].id===2)
      //  {
      //   this.gblSiteIdListArray =data.filter(d=>{ 
      //     if(d.siteId=='TSTRANSCO1')
      //     {
      //       return true;
      //     }
      //   }) 
      //  }
      //  else
      //  {
      //  this.gblSiteIdListArray = data;
      //  }
      // }catch(err)
      // {
      //   this.gblSiteIdListArray = data;
      // }
      this.gblSiteIdListArray = data;
      
   });
  /***************************************** */

      },
      (err) => {
        console.error(' fetch error : ' + JSON.stringify(err));
      }
    );
  }
  valuechange(vol:number){
    if(vol == 2){
      this.pmd.cellThresholdValue.HighVoltage = CellThresholdValuesEnum.HighVoltage;
      this.pmd.cellThresholdValue.LowVoltage = CellThresholdValuesEnum.LowVoltage;
      
      this.pmd.cellThresholdValue.HighTemperature = CellThresholdValuesEnum.HighTemperature;
      this.pmd.cellThresholdValue.LowTemperature = CellThresholdValuesEnum.LowTemperature;
      this.pmd.cellThresholdValue.NotCommnVoltage = CellThresholdValuesEnum.NotCommnVoltage;
      this.pmd.cellThresholdValue.NotCommnTemperature = CellThresholdValuesEnum.NotCommnTemperature;

      this.pmd.cellThresholdValue.BatteryAboutToDie = CellThresholdValuesEnum.BatteryAboutToDie;
      this.pmd.cellThresholdValue.OpenBattery = CellThresholdValuesEnum.OpenBattery;

    } else if(vol == 12){
      this.pmd.cellThresholdValue.HighVoltage = CellThresholdValuesEnum.HighVoltage_12V;
      this.pmd.cellThresholdValue.LowVoltage = CellThresholdValuesEnum.LowVoltage_12V;
      
      this.pmd.cellThresholdValue.HighTemperature = CellThresholdValuesEnum.HighTemperature_12V;
      this.pmd.cellThresholdValue.LowTemperature = CellThresholdValuesEnum.LowTemperature_12V;
      this.pmd.cellThresholdValue.NotCommnVoltage = CellThresholdValuesEnum.NotCommnVoltage_12V;
      this.pmd.cellThresholdValue.NotCommnTemperature = CellThresholdValuesEnum.NotCommnTemperature_12V;

      this.pmd.cellThresholdValue.BatteryAboutToDie = CellThresholdValuesEnum.BatteryAboutToDie_12V;
      this.pmd.cellThresholdValue.OpenBattery = CellThresholdValuesEnum.OpenBattery_12V;

    }else{
      this.pmd.cellThresholdValue={} as CellThresholdValues;
    }
  }

}
