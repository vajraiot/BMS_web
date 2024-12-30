import { Component, OnInit, Input } from '@angular/core';
import { GeneralData } from 'src/app/interfaces';
import { DashBoardService, ConvertersService } from 'src/app/services';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-string-param',
  templateUrl: './string-param.component.html',
  styleUrls: ['./string-param.component.css']
})
export class StringParamComponent implements OnInit {

  constructor(private dashBoardService:DashBoardService,public convertersService: ConvertersService) { }

  generalDataArray: GeneralData[];


  ngOnInit(): void {
this.serviceGetGeneralDataForEachSiteIdAndSerailNumber();
  }

  /***************variable********************* */
  displayedColumns = [
    'siteId',
    'serialNumber',
    'cellsConnectedCount',
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
    'batteryRunHours'   
  ];
  
  dataSource: MatTableDataSource<GeneralData>;
  pageEvent: PageEvent;
  selectedRowIndex = -1;
  selectRow:GeneralData;
  /******************************************* */

  /***************event methods******** */
  getRecord(coloumnData:GeneralData) {

    this.selectedRowIndex = coloumnData.deviceData[0].id;
    this.selectRow = coloumnData;
   
  }
  /************************************* */
  @Input() set receivedGeneralData(genearalDataArray:GeneralData[])
  {
    console.warn("receivedGeneralData is:"+JSON.stringify(this.generalDataArray));

    
    this.dataSource=new MatTableDataSource(genearalDataArray);
  }
  /***********testing Service******************* */
  serviceGetGeneralDataForEachSiteIdAndSerailNumber() {
    this.dashBoardService.getGeneralDataForEachSiteIdAndSerailNumber().subscribe(
      (data) => {

        
        console.warn('getCommnStatus is:' + JSON.stringify(data));
         this.generalDataArray=data;
         //this.dataSource=data as  MatTableDataSource<GeneralData>;
         this.dataSource=new MatTableDataSource(data);
      },
      (err) => {
        console.error('error is:' + JSON.stringify(err));
      }
    );
  }
  /********************************************* */
}
