import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import * as Highcharts from 'highcharts';
import { ChartType } from 'src/app/enums';
import { SpecificCellDetails, SpecificCellInput } from 'src/app/interfaces';
import { CellDetailsService, ConvertersService, SpecificCellChartsService } from 'src/app/services';

declare var require: any;
@Component({
  selector: 'app-specific-cell-graphs',
  templateUrl: './specific-cell-graphs.component.html',
  styleUrls: ['./specific-cell-graphs.component.css']
})
export class SpecificCellGraphsComponent implements OnInit {

  constructor(private specificCellChartsService:SpecificCellChartsService,
    private cellDetailsService:CellDetailsService,
    public dialogRef: MatDialogRef<SpecificCellGraphsComponent>,
    @Inject(MAT_DIALOG_DATA) public specificCellInput:SpecificCellInput,
    private convertersService:ConvertersService
    ) { 

      let todaydateTime = new Date();

      this.specificCellWithDates.siteId=specificCellInput.siteId;
      this.specificCellWithDates.serialNumber=specificCellInput.serialNumber;
      this.specificCellWithDates.cellNumber=specificCellInput.cellNumber;

      let flDateTime=convertersService.convertToFistAndLastDateTime(todaydateTime);
      this.specificCellWithDates.strStartDate=flDateTime.firstDateTime;
      this.specificCellWithDates.strEndDate=flDateTime.lastDateTime;

      console.log("specificCellWithDates is:"+JSON.stringify(this.specificCellWithDates));
      this.getChart();  
    }
getChart()
{
  this.serviceGetSpecificCellDataBySiteIdAndSerialNumberBetweenDates(
    this.specificCellWithDates.siteId,
    this.specificCellWithDates.serialNumber,
    this.specificCellWithDates.cellNumber,
    this.specificCellWithDates.strStartDate,
    this.specificCellWithDates.strEndDate,
    );
}
  ngOnInit(): void {
   // this.serviceGetSpecificCellDataBySiteIdAndSerialNumber('TSTRANSCO1','TSTRANSCOBMS1',2);
   //this.serviceGetSpecificCellDataBySiteIdAndSerialNumberBetweenDates('TSTRANSCO1','TSTRANSCOBMS1',2,'2020-11-13 00:00:00','2020-11-13 23:59:59');
  }

  @ViewChild('volateCellGraphRef',{static:true}) volateCellGraphRef: ElementRef;
  @ViewChild('temperatureCellGraphRef',{static:true}) temperatureCellGraphRef: ElementRef;

  specificCellWithDates:SpecificCellWithDates={} as SpecificCellWithDates;
  specificCellDetailsArray:SpecificCellDetails[];
  ngMdlStartDate: any;
  chartType=ChartType;
  selectedChart=ChartType.SPLINE;
  radioChange($event: MatRadioChange)
  {
    console.log($event.source.name, $event.value);
  }

  public specifiCellDataGraphs(siteId: string , serialNumber: string,cellNumber:number)
  {
    
    //this.serviceGetSpecificCellDataBySiteIdAndSerialNumber(siteId, serialNumber,cellNumber);
    this.serviceGetSpecificCellDataBySiteIdAndSerialNumberBetweenDates(siteId, serialNumber,cellNumber,'2020-11-13 00:00:00','2020-11-13 23:59:59');
  }
  //this.serviceGetSpecificCellDataBySiteIdAndSerialNumber('TSTRANSCO1','TSTRANSCOBMS1',2);
  chartGenerate(dtaArray:SpecificCellDetails[],chartTp:string)
  {
    this.specificCellDetailsArray=dtaArray;
    let optChartVoltageChart  =this.specificCellChartsService.getHigchartOfCellVoltageData(dtaArray,chartTp);
    let optChartTemperatureChart  =this.specificCellChartsService.getHigchartOfTemperatureData(dtaArray,chartTp);
  //  Highcharts.chart("idTemperatureData",optChart);
  Highcharts.chart(this.volateCellGraphRef.nativeElement, optChartVoltageChart);
  Highcharts.chart(this.temperatureCellGraphRef.nativeElement, optChartTemperatureChart);
  
  }

  specificCellDataProcessing(dtaArray:SpecificCellDetails[])
  {
    this.chartGenerate(dtaArray,this.selectedChart);
  }

  ChangeDetected(inputData:any)
  {
   let flDateTime= this.convertersService.convertToFistAndLastDateTime(inputData);
   console.log(inputData,flDateTime);
   this.specificCellWithDates.strStartDate=flDateTime.firstDateTime;
   this.specificCellWithDates.strEndDate=flDateTime.lastDateTime;
   this.getChart();
  }

  
  downLoadExcell() {

    let historicalDataUrl = '';
    historicalDataUrl = this.cellDetailsService.downloadCellDataReportUrl(
     this.specificCellWithDates.siteId,
     this.specificCellWithDates.serialNumber,
     this.specificCellWithDates.cellNumber,
     this.specificCellWithDates.strStartDate,
     this.specificCellWithDates.strEndDate
     );
    window.open(historicalDataUrl, " ", ""); //this is to link in othertab withoudistubing the current tab.And Downloading the Excell.
  }
  /***********************Service************************************* */
  serviceGetSpecificCellDataBySiteIdAndSerialNumber(siteId: string , serialNumber: string,cellNumber:number)
  {
 let numberOfRecords=400;
   this.cellDetailsService.getSpecificCellDataBySiteIdAndSerialNumber(siteId, serialNumber,cellNumber,numberOfRecords)
   .subscribe(
     (dtaArray)=>{
   this.specificCellDataProcessing(dtaArray);
     },
     (err)=>{
       console.log("Error Occured:"+JSON.stringify(err));
     }

   )
  }

  serviceGetSpecificCellDataBySiteIdAndSerialNumberBetweenDates(siteId: string , serialNumber: string,cellNumber:number,strStartDate:string,strEndDate:string)
  {
   this.cellDetailsService.getSpecificCellDataBySiteIdAndSerialNumberBetweenDates(siteId, serialNumber,cellNumber,strStartDate,strEndDate)
   .subscribe(
     (dtaArray)=>{
   this.specificCellDataProcessing(dtaArray);
     },
     (err)=>{
       console.log("Error Occured:"+JSON.stringify(err));
     }

   )
  }
  


  /****************************************************************** */
}

interface SpecificCellWithDates
{
  siteId:string;
  serialNumber:string;
  cellNumber:number;
  strStartDate:string;
  strEndDate:string;
}