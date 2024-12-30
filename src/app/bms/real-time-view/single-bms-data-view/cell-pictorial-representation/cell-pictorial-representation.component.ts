import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {CellLegends} from '../../../../enums/cell-legends.enum'
import {CellLegendsColors} from '../../../../enums/cell-legends-colors.enum';
import { MatDialog } from '@angular/material/dialog';

import { GeneralDataSubjectService } from '../../../../services/subjects/general-data-subject.service';
import { CellThresholdValuesEnum } from '../../../../enums';
import { CellThresholdValues } from '../../../../interfaces/cell-threshold-values';
import { CellVoltageTemperatureData, CellWithChargeStatus, GeneralData } from '../../../../interfaces';

declare var $:any;

@Component({
  selector: 'app-cell-pictorial-representation',
  templateUrl: './cell-pictorial-representation.component.html',
  styleUrls: ['./cell-pictorial-representation.component.css'],
})
export class CellPicstorialRepresentationComponent implements OnInit {

  constructor(public dialog: MatDialog,private generalDataSubjectService:GeneralDataSubjectService) {
 
  }

  ngOnInit(): void {
    
    this.generalDataSubjectService.getGeneralData().subscribe((dta)=>{
      this.setThesouldValues(dta);
    });

  }
  
  
 
glbSingleCellInformation:SingleCellInformation={} as any;
cellThresholdValues: CellThresholdValues;
//gblCellThresholdValues:CellThresholdValues;

setThesouldValues(genearalData:GeneralData){  
  debugger;
  if(genearalData.cellThresholdValue){
    this.cellThresholdValues =genearalData.cellThresholdValue;
  }else{
    this.cellThresholdValues=CellThresholdValuesEnum;
  }
}


gblChargingStatus:boolean;

@Input() set parentChargingStatus(ChargingStatus:boolean)
{
  this.gblChargingStatus=ChargingStatus;
}


@Input() set parentCellData(eachCell:CellVoltageTemperatureData)
{
  console.log("gblChargingStatus is:"+this.gblChargingStatus+"eachCell data:"+JSON.stringify(eachCell));
  

  let cellData = eachCell;

  this.glbSingleCellInformation.cellNumber=cellData.cellNumber;
  this.glbSingleCellInformation.cellVoltage=cellData.cellVoltage;
  this.glbSingleCellInformation.cellTemperature=cellData.cellTemperature;

  //cellData.cellVoltage=1.96; //testing purpose
  
//cell comm fail sample temp 65535 volt 65.;535

//if((cellData.cellVoltage>60)||(cellData.cellTemperature>60000)) //logic for Notcommuncation
if(!this.cellThresholdValues){
  this.generalDataSubjectService.getGeneralData().subscribe((dta)=>{
    this.setThesouldValues(dta);
  });
}
if((cellData.cellVoltage==-1)||(cellData.cellTemperature==-1)) //logic for Notcommuncation
{
this.glbSingleCellInformation.cellPics = CellLegends.CommnFail;
this.glbSingleCellInformation.cellHeaderColor= {'background-color' :CellLegendsColors.CommnFail,'color':'white'};  

}
else if((cellData.cellVoltage<=this.cellThresholdValues.LowVoltage)&&(cellData.cellVoltage>this.cellThresholdValues.BatteryAboutToDie)) //for low Voltage
  {
  this.glbSingleCellInformation.cellPics = CellLegends.BatteryLowVoltage;
   this.glbSingleCellInformation.cellHeaderColor= {'background-color' :CellLegendsColors.BatteryLowVoltage,'color':'white'};  
  }

else if((cellData.cellVoltage<=this.cellThresholdValues.BatteryAboutToDie)&&(cellData.cellVoltage>this.cellThresholdValues.OpenBattery)) //for Battery Abbout To Die
{
this.glbSingleCellInformation.cellPics = CellLegends.BatteryAboutToDie;
 this.glbSingleCellInformation.cellHeaderColor= {'background-color' :CellLegendsColors.BatteryAboutToDie,'color':'white'};  
}

else if((cellData.cellVoltage<=this.cellThresholdValues.OpenBattery)) //for Battery Abbout To Die
{
this.glbSingleCellInformation.cellPics = CellLegends.OpenBattery;
 this.glbSingleCellInformation.cellHeaderColor= {'background-color' :CellLegendsColors.OpenBattery,'color':'white'};  
}
  else if(cellData.cellVoltage>=this.cellThresholdValues.HighVoltage) //for Open Battery
  {
  this.glbSingleCellInformation.cellPics = CellLegends.BatteryHighVoltage;
   this.glbSingleCellInformation.cellHeaderColor= {'background-color' :CellLegendsColors.BatteryHighVoltage,'color':'white'};  
  }
  else if(cellData.cellTemperature>=this.cellThresholdValues.HighTemperature)//for High Temp
  {
  this.glbSingleCellInformation.cellPics = CellLegends.BatteryHighTemperature;
   this.glbSingleCellInformation.cellHeaderColor= {'background-color' :CellLegendsColors.BatteryHighTemperature,'color':'white'};  
  }
  else
  {
    if(this.gblChargingStatus==false) //chargeing
    {
     this.glbSingleCellInformation.cellPics = CellLegends.LegendCharging;
     this.glbSingleCellInformation.cellHeaderColor= {'background-color' :CellLegendsColors.LegendCharging,'color':'white'};  
    }
   else if(this.gblChargingStatus==true) //Discharging
   {
    this.glbSingleCellInformation.cellPics = CellLegends.LegendDisCharging;
    this.glbSingleCellInformation.cellHeaderColor= {'background-color' :CellLegendsColors.LegendDisCharging,'color':'white'};  
   }

  }
}
 getCellWithChargeStatus(cellWithChargeStatus : CellWithChargeStatus)
{

   
 }
 getTempValueColorIndication( singleCellInformation: SingleCellInformation)
{
  try{
    let value=singleCellInformation.cellTemperature;
    if(value<=this.cellThresholdValues.LowTemperature)
    {
      return {'color':'red !important'}
    }
    else if(value>=this.cellThresholdValues.HighTemperature)
    {
      return {'color':'red !important'}
    }

  }
  catch(error)
  {
    return {'color':'white !important'}
  }
}

getVoltValueColorIndication( singleCellInformation: SingleCellInformation)
{
  try{
    let value=singleCellInformation.cellVoltage;
    if(value<=this.cellThresholdValues.LowVoltage)
    {
      return {'color':'red !important;'};
    }
    else if(value>=this.cellThresholdValues.HighVoltage)
    {
      return {'color':'red !important;'};
    }
  }
  catch(error)
  {
    return {'color':'red !important'};
  }
}

  //@Input() set receivCellInformatio(cellData:any) {  }

  /***************************Event***************************** */
  
  evntToOpenSpecificCellModel()
  {
    $('#idSpecificCellPictorialModelTest').modal('show');
  }
  



}

interface SingleCellInformation {
  cellNumber: number;
  cellVoltage: number;
  cellTemperature: number;
  cellPics: string;
  cellHeaderColor: any;
}
