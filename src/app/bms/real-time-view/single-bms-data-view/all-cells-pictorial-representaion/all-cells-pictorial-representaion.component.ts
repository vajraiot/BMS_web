import { Component, OnInit, Input } from '@angular/core';
import {CellLegends} from '../../../../enums/cell-legends.enum';
import {CellLegendsColors} from '../../../../enums/cell-legends-colors.enum';
import { from } from 'rxjs';
import { DeviceData, CellVoltageTemperatureData,CellWithChargeStatus, GeneralData, SpecificCellInput } from '../../../../interfaces';
import { GeneralDataSubjectService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { TestingComponent } from 'src/app/bms/test/testing/testing.component';
import { SpecificCellGraphsComponent } from '../specific-cell-graphs/specific-cell-graphs.component';
declare var $:any;

@Component({
  selector: 'app-all-cells-pictorial-representaion',
  templateUrl: './all-cells-pictorial-representaion.component.html',
  styleUrls: ['./all-cells-pictorial-representaion.component.css']
})
export class AllCellsPictorialRepresentaionComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private generalDataSubjectService:GeneralDataSubjectService,
  ) {
    this.cellLegendsPics = CellLegends;
  this.gblCellLegendsColors=CellLegendsColors;

  
  }
  ngOnInit(): void {
    this.generalDataSubjectService.getGeneralData().subscribe((dta)=>{
      this.generalDataProcessing(dta);
    });
  }

  genearalData:GeneralData
  gblAllCellData: CellVoltageTemperatureData[];
  cellLegendsPics: any;
  gblCellLegendsColors:any;
  gblChargingStatus: boolean;


generalDataProcessing(genearalData:GeneralData)
{
  try{
    this.genearalData=genearalData;
  this.deviceDataProcessing(genearalData.deviceData[0]);
  }
  catch(err)
  {
    console.error("error occured in all cells pictorial representation.");  
  }
}

  //@Input() set 
  deviceDataProcessing(bmsDeviceData: DeviceData)
  {
//console.log("receivingLatestPacketData is:"+JSON.stringify(latestPacketData));
    if ((bmsDeviceData == null))
    {
      return;
    }
   
    this.gblAllCellData=bmsDeviceData.cellVoltageTemperatureData;
    let  alarmData = bmsDeviceData.bmsalarms;
    this.gblChargingStatus=alarmData.bankCycleDC; 
    //this.gblChargingStatus=true;  //hardCode Statues
  }

  ngstlAllCellHeader()
  {
    if(this.gblChargingStatus==false)
    {
      return {'background-color':'green','color':'white'};
    }
    else
    {
      return {'background-color':'red','color':'white'};
    }
  }


  getCellWithChargeStatus(cellData:CellVoltageTemperatureData,chargeStatus:boolean) : CellWithChargeStatus
  {
   let lclCellWithChargeStatus:CellWithChargeStatus ={} as CellWithChargeStatus;
   lclCellWithChargeStatus.ChargingStatus=chargeStatus
   lclCellWithChargeStatus.CellVoltageTemperatureData=cellData;

  console.log("cell method:"+JSON.stringify(lclCellWithChargeStatus));
  
   return lclCellWithChargeStatus;
  }


evntToOpenSpecificCellModel()
{
  $('#idSpecificCellPictorialModel').modal('show');
}
 

openDialog(sn) {

  let specificCellInput:SpecificCellInput={} as SpecificCellInput;
  specificCellInput.siteId=this.genearalData.siteId;
  specificCellInput.serialNumber=this.genearalData.deviceData[0].serialNumber;
  specificCellInput.cellNumber=sn;
  this.dialog.open(SpecificCellGraphsComponent,
    {data:specificCellInput}
    );
  
}
}
