import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ApplicationUtilitiesService,
  SiteIdListService,
  ReportsService,
  ConvertersService,
  LoginRolesSubjectService,
} from 'src/app/services';
import { SerialNumberList, SiteIdList, ContentPageMaker, StringParam, CellParam } from 'src/app/interfaces';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css'],
})
export class HistoricalComponent implements OnInit {
  constructor(
    private applicationUtilitiesService: ApplicationUtilitiesService,
    private siteIdListService: SiteIdListService,
    private reportsService:ReportsService,
    public convertersService:ConvertersService,
    private loginRolesSubjectService:LoginRolesSubjectService,
    
  ) {}

  ngOnInit(): void {
    this.applicationUtilitiesService.verifyLogin(); //this is for redirect login page if it is not login
    this.serviceGetAllSiteIdWithSerialNumbers();
   this.serviceHistoricalStringData(0 , 20);

  //this.eventGetButton();
  //this.serviceHistoricalCellData(0,20);
  }

 

  /*******************Variable**************** */
  
  paramType=ParamType;
  gblSiteIdListArray: SiteIdList[];
  gblSerialNumberListArray: SerialNumberList[];
  selectedSiteId = '';
  selectedSerialNumber = '';
  ngmSelectedParamsType = 'select Param Type';

  stringParamdisplayedColumns = [

    'siteId',
    'serialNumber',
    'packetDateTime',
    'stringvoltage',
    'systemPeakCurrentInChargeOneCycle',
    'averageDischargingCurrent',
    'averageChargingCurrent',
    'ahInForOneChargeCycle',
    'ahOutForOneDischargeCycle',
    'cumulativeAHIn',
    'cumulativeAHOut',
    'chargeTimeCycle',
    'dischargeTimeCycle',
    'totalChargingEnergy',
    'totalDischargingEnergy',
    'everyHourAvgTemp',
    'cumulativeTotalAvgTempEveryHour',

    'socLatestValueForEveryCycle',
    'dodLatestValueForEveryCycle',
    'systemPeakCurrentInDischargeOneCycle',
    'instantaneousCurrent',
    'ambientTemperature',
    'batteryRunHours',
  ];

 //cellParamdisplayedColumns = this.cellParamArray();
 cellParamdisplayedColumns=[];
  stringParamDataSource: MatTableDataSource<StringParam>;
  cellParamDataSource: MatTableDataSource<CellParam>;

  pageEvent: PageEvent;
  selectedRowIndex:any;


  PageNumber : any;
  PageSize :any;
  TotalPages :any;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  //@ViewChild("startDateRef", {static: false}) startDateRef: OwlDateTimeComponent ;
  

  cellsCount=0;

  ngMdlStartDate: any;
  ngMdlEndDate: any;
  
  /********************************************** */
  /*************************************Regular Methods****************** */
  historicalStringDataProcessing(contentPageMaker:ContentPageMaker)
  {

    console.warn("historicalStringDataProcessing is:"+JSON.stringify(contentPageMaker));
    if(contentPageMaker==null)
    {
      return;
    }
    this.stringParamDataSource=new MatTableDataSource(contentPageMaker.content);

    this.PageNumber = contentPageMaker.page.number;
    this.PageSize = contentPageMaker.page.size;
    this.TotalPages = contentPageMaker.page.totalElements;
  }

  historicalCellDataProcessing(contentPageMaker:ContentPageMaker)
  {

    //console.warn("historicalCellDataProcessing is:"+JSON.stringify(contentPageMaker));
    console.warn("historicalCellDataProcessing is:"+JSON.stringify(contentPageMaker.content[0].lstCellVoltageTemperatureData));
    if(contentPageMaker==null)
    {
      return;
    }
    this.cellParamDataSource=new MatTableDataSource(contentPageMaker.content);


    this.PageNumber = contentPageMaker.page.number;
    this.PageSize = contentPageMaker.page.size;
    this.TotalPages = contentPageMaker.page.totalElements;
    
    try{
     this.cellsCount= this.cellParamDataSource.data[0].lstCellVoltageTemperatureData.length;
    console.log("cells count is :"+this.cellsCount);
    }
    catch(err)
    {this.cellsCount=0;}
    this.cellParamdisplayedColumns = this.cellParamArray();
  }
  cellParamArray():string[]
  {
    let rtnStringArray : Array<string> = [];
    
    /*rtnStringArray.push('id'); */

    rtnStringArray.push('siteId');
    rtnStringArray.push('serialNumber');
    rtnStringArray.push('packetDateTime');
  //  let cellCount=24;
  let cellCount=this.cellsCount;
    for(let i=0;i<cellCount;i++)
    {
      rtnStringArray.push('cell'+(i+1));
    }
    console.log("string array is:"+rtnStringArray);
    return rtnStringArray;
  }

  secondsTohhmmss(totalSeconds)
  {
  return this.convertersService.secondsTohhmmss(totalSeconds);
  }
  /********************************************************************* */
  /*************************************Event Method******************* */
  eventTestButton()
  {
  //console.log(this.startDateRef._selected);
  }

  eventGetButton() {
    this.paginator.pageIndex = 0;//this is for initial
    this.selectedRowIndex=-1;
    console.log('ngmSelectedParamsType is' + this.ngmSelectedParamsType);
    
    if( !this.checkIfInputsAreValid())  {
      return;
    }

if(this.ngmSelectedParamsType==this.paramType.stringParam)
{
  this.serviceHistoricalStringData(0,20);
}    
if(this.ngmSelectedParamsType==this.paramType.cellParam)
{
  this.serviceHistoricalCellData(0,20);
}
  
  }

  clearButton()
  {
    this.ngMdlStartDate='';
    this.ngMdlEndDate='';
  }


  downLoadExcell()
  {
    if( !this.checkIfInputsAreValid())  {
      return;
    }

 let owlStartDate = ((document.getElementById("inptStartDate") as HTMLInputElement).value);
 let owlEndDate = ((document.getElementById("inptEndDate") as HTMLInputElement).value);


    let lclstrStartDate = this.convertersService.convertOwlDatetimeToCustomDate(owlStartDate);//2019-11-16 00:00:00
    let lclstrEndDate = this.convertersService.convertOwlDatetimeToCustomDate(owlEndDate);  //2019-11-16 00:00:00

    lclstrEndDate = lclstrEndDate.substring(0, 10) + " 23:59:59";

   let historicalDataUrl='';
   

      if(this.ngmSelectedParamsType==this.paramType.stringParam)
    {
      historicalDataUrl=this.reportsService.getdownloadHistoricalStringReportUrl(this.selectedSiteId,this.selectedSerialNumber,lclstrStartDate,lclstrEndDate);
    }    
    if(this.ngmSelectedParamsType==this.paramType.cellParam)
    {
      historicalDataUrl=this.reportsService.getdownloadHistoricalCellReportUrl(this.selectedSiteId,this.selectedSerialNumber,lclstrStartDate,lclstrEndDate);
    }
       window.open(historicalDataUrl," ",""); //this is to link in othertab withoudistubing the current tab.And Downloading the Excell.
  }

  checkIfInputsAreValid() :boolean
  {
    
 if((this.selectedSiteId=='')||(this.selectedSiteId==null))
 {
   alert("Please select the siteid:");
   return false;
 }

 else if((this.selectedSerialNumber=='')||(this.selectedSerialNumber==null))
 {
   alert("Please select Serial Number.");
   return false;
 }
 else if((this.ngMdlStartDate=='')||(this.ngMdlStartDate==null))
 {
   alert("Please Enter the Start Date.");
   return false;
 }
 else if((this.ngMdlEndDate=='')||(this.ngMdlEndDate==null))
 {
   alert("Please Enter the End Date.");
   return false;
 }
 else 
 {
   return true;
 }
  }

  evntSiteIdSelectionChange(value) {
    console.log('check method called......' + value);
    if (value == null) {
      this.selectedSiteId = '';
    } else if (value.includes('select')) {
      this.selectedSiteId = '';
    } else {
      this.selectedSiteId = value;
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
      this.selectedSerialNumber = '';
      return;
    }
    if (value.includes('select')) {
      console.log('value incldes is:' + value);
      this.selectedSerialNumber = '';
      return;
    }
    this.selectedSerialNumber = value;
  }

  evntParamType(value:any)
  {
    this.ngmSelectedParamsType=value;
   this.stringParamDataSource=new MatTableDataSource([]);
   this.cellParamDataSource=new MatTableDataSource([]);
   this.selectedRowIndex=-1;
   this.paginator.pageIndex = 0;//this is for initial

   
  }
  public handlePage(e: any) {


    //console.log(" e.totalPages..."+ e.totalPages);
    // console.log(" e.pageIndex..."+ e.pageIndex);
  
    // console.log("  e.pageSize  " + e.pageSize);
    
     //this.RowscountperTable =e.pageSize;
     if(this.ngmSelectedParamsType==this.paramType.stringParam)
     {
      this.serviceHistoricalStringData(e.pageIndex, e.pageSize);
     }

     
     if(this.ngmSelectedParamsType==this.paramType.cellParam)
     {
      this.serviceHistoricalCellData(e.pageIndex, e.pageSize);
     }
     
     //this.GetuserData(e.pageIndex, e.pageSize)
   // this.GetDatbetweenthDate(this.gstartdate,this.gEndDate ,e.pageIndex, e.pageSize);
  
  }


  getRecord(coloumnData: any) {
    console.clear();
    console.log(coloumnData);
    this.selectedRowIndex = coloumnData.id;
  }
  ngStyleEachTempValue(dta:number)
  {
   try{
    return {'color':'black'};
   }
   catch(error)
   {
     return {'color':'black'};
   }
  }

  ngStyleEachVoltValue(dta:number)
  {
try{
  return {'color':'black'};
}
catch(error)
{
  return {'color':'black'};
}
  }


  /******************************************************************* */

  /*******************Services************************* */
  serviceGetAllSiteIdWithSerialNumbers() {
    this.siteIdListService.getAllSiteIdWithSerialNumbers()
    
    .subscribe(
      (data) => {
        if (data == null) {          return;        }
            /***************loginrole********* */
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
    /******************************************** */

    
      },
      (err) => {
        console.error(' fetch error : ' + JSON.stringify(err));
      }
    );
  }


  serviceHistoricalStringData(pgnmbr:any, PgSz:any)
  {

   let owlStartDate = ((document.getElementById("inptStartDate") as HTMLInputElement).value);
   let owlEndDate = ((document.getElementById("inptEndDate") as HTMLInputElement).value);
 
   
   let lclstrStartDate = this.convertersService.convertOwlDatetimeToCustomDate(owlStartDate);//2019-11-16 00:00:00
   let lclstrEndDate = this.convertersService.convertOwlDatetimeToCustomDate(owlEndDate);  //2019-11-16 00:00:00

   lclstrEndDate=lclstrEndDate.substring(0,10)+" 23:59:59";

   this.reportsService.getHistoricalStringDataWithPg(pgnmbr, PgSz, this.selectedSerialNumber, this.selectedSiteId,lclstrStartDate,lclstrEndDate)
   .subscribe(
 
     (data) => {
       this.historicalStringDataProcessing(data);
    //  alert(data.content.length);
    console.log("Successfully Data Fecthed with Size is:"+data.content.length);
      // this.ftmsData=data[0];
 
    
   
   
   },
   err => {
    
       console.log(' fetch error : ' + err);
   }
  
    )
  }


  serviceHistoricalCellData(pgnmbr:any, PgSz:any)
  { 
    let owlStartDate = ((document.getElementById("inptStartDate") as HTMLInputElement).value);
   let owlEndDate = ((document.getElementById("inptEndDate") as HTMLInputElement).value);
 
   
   let lclstrStartDate = this.convertersService.convertOwlDatetimeToCustomDate(owlStartDate);//2019-11-16 00:00:00
   let lclstrEndDate = this.convertersService.convertOwlDatetimeToCustomDate(owlEndDate);  //2019-11-16 00:00:00

   lclstrEndDate=lclstrEndDate.substring(0,10)+" 23:59:59";

   this.reportsService.getHistoricalCellDataWithPg(pgnmbr, PgSz, this.selectedSerialNumber, this.selectedSiteId,lclstrStartDate,lclstrEndDate)
   .pipe(
      tap(tp=>{
        console.clear();
        console.log(tp);          
        }),
        map((res:ContentPageMaker)=>{
          
          let cellParamArray=res.content as CellParam[];
          cellParamArray.forEach((cellParam,cind)=>{
          return  cellParam.lstCellVoltageTemperatureData.forEach((cvt,cvtInd)=>{
            if(cvt.cellTemperature>60000)
            {
              cvt.cellTemperature=-1;
            }

            if(cvt.cellVoltage>60)
            {
              cvt.cellVoltage=-1;
            }
           });
          })
           
          return res;
        }
       
        )
    )
    .subscribe(
 
     (data) => {
       this.historicalCellDataProcessing(data);
   
   },
   err => {
    
       console.log(' fetch error : ' + err);
   }
  
    )
  }

  /***************************************************** */
}

enum ParamType
{
  stringParam='String Details',
  cellParam='Cell Details',
}