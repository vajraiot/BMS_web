import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, tap } from 'rxjs/operators';
import { DayWiseData, SerialNumberList, SiteIdList } from 'src/app/interfaces';
import { ApplicationUtilitiesService, ConvertersService, FieldNamesMapperService, LoginRolesSubjectService, ReportsService, SiteIdListService } from 'src/app/services';

@Component({
  selector: 'app-day-wise',
  templateUrl: './day-wise.component.html',
  styleUrls: ['./day-wise.component.css']
})
export class DayWiseComponent implements OnInit {

  constructor(private siteIdListService:SiteIdListService,
    private loginRolesSubjectService:LoginRolesSubjectService,
    private reportsService:ReportsService,
    private applicationUtilitiesService:ApplicationUtilitiesService,
    private convertersService:ConvertersService) { }

  ngOnInit(): void {
    this.applicationUtilitiesService.verifyLogin(); //this is for redirect login page if it is not login
    this.serviceGetAllSiteIdWithSerialNumbers();
  }

  /******************Variabls********************************************** */
  fieldNamesMapperService=FieldNamesMapperService;
  gblSiteIdListArray: SiteIdList[];
  gblSerialNumberListArray: SerialNumberList[];
  selectedSiteId = '';
  selectedSerialNumber = '';
  ngmSelectedParamsType = 'select Param Type';
  
  dayWiseDataisplayedColumns = [

    'dayWiseDate',
    'chargeOrDischargeCycle',
     'cumulativeAHIn',
     'cumulativeAHOut',
     'totalChargingEnergy',
     'totalDischargingEnergy',
     'batteryRunHours',     
      ];

  dayWiseDataSource: MatTableDataSource<DayWiseData>;
  selectedRowIndex: any;

  ngMdlStartDate: any;
  ngMdlEndDate: any;
  /************************************************************************* */
   /*************************************Event Method******************* */
   eventTestButton() {
    //console.log(this.startDateRef._selected);
  }

  clearButton()
  {
    this.ngMdlStartDate='';
    this.ngMdlEndDate='';
  }
  eventGetButton() {
    if( !this.checkIfInputsAreValid())  {
      return;
    }
    this.selectedRowIndex = -1;
    let owlStartDate = ((document.getElementById("inptStartDate") as HTMLInputElement).value);
    let owlEndDate = ((document.getElementById("inptEndDate") as HTMLInputElement).value);

    this.servicesGetDaywiseReports(this.selectedSerialNumber,this.selectedSiteId,this.convertersService.convertOwlDatetimeToCustomDate(owlStartDate),this.convertersService.convertOwlDatetimeToCustomDate(owlEndDate));

  }
  downLoadExcell() {
    if( !this.checkIfInputsAreValid())  {
      return;
    }
     
      let owlStartDate = ((document.getElementById("inptStartDate") as HTMLInputElement).value);
      let owlEndDate = ((document.getElementById("inptEndDate") as HTMLInputElement).value);
  
  
      let dayWiseDataUrl = '';
  
      dayWiseDataUrl = this.reportsService.getdownloadDaywiseReportsUrl(
        this.selectedSiteId,
        this.selectedSerialNumber,
        this.convertersService.convertOwlDatetimeToCustomDate(owlStartDate),
        this.convertersService.convertOwlDatetimeToCustomDate(owlEndDate)        
           );
      window.open(dayWiseDataUrl, " ", ""); //this is to link in othertab withoudistubing the current tab.And Downloading the Excell.
    
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


  getRecord(coloumnData: DayWiseData) {
    console.clear();
    console.log(coloumnData);
    this.selectedRowIndex = coloumnData.dayWiseDate;
  }
  /************************************************************************* */

  /***************************************Regular Methods******************* */
daywiseDataProcessing(dayWiseDataArray:DayWiseData[])
{
this.dayWiseDataSource=new MatTableDataSource(dayWiseDataArray);
}

checkIfInputsAreValid() : boolean
  {
    if ((this.selectedSiteId == '') || (this.selectedSiteId == null)) {
      alert("Please select the siteid:");
      return false;
    }

    else if ((this.selectedSerialNumber == '') || (this.selectedSerialNumber == null)) {
      alert("Please select Serial Number.");
      return false;
    }
    else if ((this.ngMdlStartDate == '') || (this.ngMdlStartDate == null)) {
      alert("Please Enter the Start Date.");
      return false;
    }
    else if ((this.ngMdlEndDate == '') || (this.ngMdlEndDate == null)) {
      alert("Please Enter the End Date.");
      return false;
    }
    else{
      return true;
    }

  }
  /************************************************************************** */

  /**********************Services******************************* */
  serviceGetAllSiteIdWithSerialNumbers() {
    this.siteIdListService.getAllSiteIdWithSerialNumbers()

      .subscribe(
        (data) => {
          if (data == null) { return; }
          /***************loginrole********* */
          this.loginRolesSubjectService.getLoginRoles()
            .subscribe((lgDta) => {
              this.gblSiteIdListArray = data;

            });
          /******************************************** */


        },
        (err) => {
          console.error(' fetch error : ' + JSON.stringify(err));
        }
      );
  }
servicesGetDaywiseReports(serialNumber: string, siteId: string,strStartDate:string,strEndDate:string)
  {
    this.reportsService.getDaywiseReports(serialNumber, siteId,strStartDate,strEndDate)
    .pipe(
      tap(tp=>{
        console.clear();
        console.log(tp);
      }),
      map((datasrc: DayWiseData[]) => {
           
    
        datasrc.forEach((d, ind) => {
       
        d.chargeOrDischargeCycle= parseFloat(d.chargeOrDischargeCycle.toFixed(3));
        d.cumulativeAHIn= parseFloat(d.cumulativeAHIn.toFixed(3));
        d.cumulativeAHOut= parseFloat(d.cumulativeAHOut.toFixed(3));
        d.totalChargingEnergy= parseFloat(d.totalChargingEnergy.toFixed(3));

        d.totalDischargingEnergy= parseFloat(d.totalDischargingEnergy.toFixed(3));
       
        })
        return datasrc ;
      }
      )
    )
    .subscribe(
      (dta)=>{
       this.daywiseDataProcessing(dta);
      },
      (err)=>{

      }
    );

  }
  /************************************************************* */
}
