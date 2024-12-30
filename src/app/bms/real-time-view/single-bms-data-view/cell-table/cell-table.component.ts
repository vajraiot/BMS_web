import { Component, OnInit, Input } from '@angular/core';
import { DeviceData, GeneralData } from 'src/app/interfaces';
import { GeneralDataSubjectService } from 'src/app/services';

@Component({
  selector: 'app-cell-table',
  templateUrl: './cell-table.component.html',
  styleUrls: ['./cell-table.component.css']
})
export class CellTableComponent implements OnInit {

  constructor(private generalDataSubjectService:GeneralDataSubjectService,) {
    
this.generalDataSubjectService.getGeneralData().subscribe((dta)=>{
  this.generalDataProcessing(dta);
});
   }

  ngOnInit(): void {
  }
/*********************Global Variable*********************** */
gblCellsData: any;
/*********************************************************** */
  /*************getting Data From Parent Component*********** */
  generalDataProcessing(genearalData:GeneralData)
  {
    try{
    this.deviceDataProcessing(genearalData.deviceData[0]);
    }
    catch(err)
    {
      console.error("error occured in all cells pictorial representation.");  
    }
  }
  deviceDataProcessing(bmsDeviceData: DeviceData)
  {
    this.receivingCellData(bmsDeviceData.cellVoltageTemperatureData);
  }
  //@Input() set 
  receivingCellData(cellsData: any) {
    console.log("in cell table data is:" + JSON.stringify(cellsData));
    this.gblCellsData = cellsData;
  }
}
