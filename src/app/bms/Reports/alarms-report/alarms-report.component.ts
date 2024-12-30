import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApplicationUtilitiesService,
  SiteIdListService,
  ReportsService,
  ConvertersService,
  LoginRolesSubjectService,
} from 'src/app/services';
import { SerialNumberList, SiteIdList, ContentPageMaker, StringParam, CellParam, AlarmsParam } from 'src/app/interfaces';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-alarms-report',
  templateUrl: './alarms-report.component.html',
  styleUrls: ['./alarms-report.component.css']
})
export class AlarmsReportComponent implements OnInit {

  constructor(
    private applicationUtilitiesService: ApplicationUtilitiesService,
    private siteIdListService: SiteIdListService,
    private reportsService: ReportsService,
    public convertersService: ConvertersService,
    private loginRolesSubjectService: LoginRolesSubjectService,

  ) { }

  ngOnInit(): void {
    this.applicationUtilitiesService.verifyLogin(); //this is for redirect login page if it is not login
    this.serviceGetAllSiteIdWithSerialNumbers();
  //  this.serviceHistoricalStringData(0, 20);

    //this.eventGetButton();
    //this.serviceHistoricalCellData(0,20);
  }



  /*******************Variable**************** */

 
  gblSiteIdListArray: SiteIdList[];
  gblSerialNumberListArray: SerialNumberList[];
  selectedSiteId = '';
  selectedSerialNumber = '';
  ngmSelectedParamsType = 'select Param Type';

  AlarmsParamdisplayedColumns = [

    'siteId',
    'serialNumber',
     'bankCycle',
     'ambientTemperature',
     'soc',
     'stringVoltage',
     'stringCurrent',
     'bmsSedCommunication',
     'cellCommunication',
     'cellVoltage',
     'cellTemperature',
     'packetDateTime',
     'buzzer',
     'dgStatus',
     'ebStatus'
      ];

  alarmsParamDataSource: MatTableDataSource<AlarmsParam>;

  pageEvent: PageEvent;
  selectedRowIndex: any;

  PageNumber: any;
  PageSize: any;
  TotalPages: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  ngMdlStartDate: any;
  ngMdlEndDate: any;

  /********************************************** */
  /*************************************Regular Methods****************** */
  historicalAlarmsDataProcessing(contentPageMaker: ContentPageMaker) {

    console.warn("historicalAlarmsDataProcessing is:" + JSON.stringify(contentPageMaker));
    if (contentPageMaker == null) {
      return;
    }
    this.alarmsParamDataSource = new MatTableDataSource(contentPageMaker.content);

    this.PageNumber = contentPageMaker.page.number;
    this.PageSize = contentPageMaker.page.size;
    this.TotalPages = contentPageMaker.page.totalElements;
  }


  /********************************************************************* */
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
    this.paginator.pageIndex = 0;//this is for initial
    this.selectedRowIndex = -1;
    console.log('ngmSelectedParamsType is' + this.ngmSelectedParamsType);
 
    this.serviceHistoricalStringData(0, 20);

  }


  downLoadExcell() {
    // window.open(this.getMontlyReportURL()," ","width=500,height=100");
if( !this.checkIfInputsAreValid())  {
    return;
  }
   
    let owlStartDate = ((document.getElementById("inptStartDate") as HTMLInputElement).value);
    let owlEndDate = ((document.getElementById("inptEndDate") as HTMLInputElement).value);


    let lclstrStartDate = this.convertersService.convertOwlDatetimeToCustomDate(owlStartDate);//2019-11-16 00:00:00
    let lclstrEndDate = this.convertersService.convertOwlDatetimeToCustomDate(owlEndDate);  //2019-11-16 00:00:00

    lclstrEndDate = lclstrEndDate.substring(0, 10) + " 23:59:59";

    let historicalDataUrl = '';

    historicalDataUrl = this.reportsService.getdownloadHistoricalAlarmsReportUrl(this.selectedSiteId, this.selectedSerialNumber, lclstrStartDate, lclstrEndDate);
    window.open(historicalDataUrl, " ", ""); //this is to link in othertab withoudistubing the current tab.And Downloading the Excell.
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

  public handlePage(e: any) {
  this.serviceHistoricalStringData(e.pageIndex, e.pageSize);
  }


  getRecord(coloumnData: any) {
    console.clear();
    console.log(coloumnData);
    this.selectedRowIndex = coloumnData.id;
  }

  ngStyleEachTempValue(dta: number) {
    try {
      return { 'color': 'black' };
    }
    catch (error) {
      return { 'color': 'black' };
    }
  }

  ngStyleEachVoltValue(dta: number) {
    try {
      return { 'color': 'black' };
    }
    catch (error) {
      return { 'color': 'black' };
    }
  }


  /******************************************************************* */

  /*******************Services************************* */
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


  serviceHistoricalStringData(pgnmbr: any, PgSz: any) {
    let owlStartDate = ((document.getElementById("inptStartDate") as HTMLInputElement).value);
      let owlEndDate = ((document.getElementById("inptEndDate") as HTMLInputElement).value);


    let lclstrStartDate = this.convertersService.convertOwlDatetimeToCustomDate(owlStartDate);//2019-11-16 00:00:00
    let lclstrEndDate = this.convertersService.convertOwlDatetimeToCustomDate(owlEndDate);  //2019-11-16 00:00:00

    lclstrEndDate=lclstrEndDate.substring(0,10)+" 23:59:59";

    this.reportsService.getHistoricalAlarmsDataWithPg(pgnmbr, PgSz, this.selectedSerialNumber, this.selectedSiteId,lclstrStartDate,lclstrEndDate)
    .subscribe(
      (data) => {
        this.historicalAlarmsDataProcessing(data);
        //  alert(data.content.length);
        console.log("Successfully Data Fecthed with Size is:" + data.content.length);
        // this.ftmsData=data[0]; 

      },
      err => {

        console.log(' fetch error : ' + err);
      }

    )
  }



  /***************************************************** */
}


