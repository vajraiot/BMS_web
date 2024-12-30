import { Component, OnInit, Input } from '@angular/core';
import { GeneralDataSubjectService } from 'src/app/services';

import { CellThresholdValuesEnum } from '../../../../enums/cell-threshold-values.enum';
import { BMSAlarms, DeviceData, GeneralData } from 'src/app/interfaces';
import { CellThresholdValues } from '../../../../interfaces/cell-threshold-values';
import { CellVoltageTemperatureData } from '../../../../interfaces';


@Component({
  selector: 'app-device-alarm2',
  templateUrl: './device-alarm2.component.html',
  styleUrls: ['./device-alarm2.component.css']
})
export class DeviceAlarm2Component implements OnInit {


  constructor(private generalDataSubjectService:GeneralDataSubjectService,) {}

  //@Input('receivingAlarmsData') alarmsData:BMSAlarms;

  //alarmsData:BMSAlarms

    /*********************Global Variable*********************** */
    gblAlarmsData: BMSAlarms;
    gblBmsDeviceData: DeviceData;
    cellThresholdValues:CellThresholdValues;
    /*********************************************************** */
  generalDataProcessing(genearalData:GeneralData)
  {
    if(genearalData.cellThresholdValue){
      this.cellThresholdValues =genearalData.cellThresholdValue;
    }else{
      this.cellThresholdValues=CellThresholdValuesEnum;
    }
    try{
  this.receivingBmsDeviceData(genearalData.deviceData[0]);
    }
    catch(err)
    {
      
    }
  }

  //@Input() set 
  receivingBmsDeviceData( bmsDeviceData: DeviceData)
  {
    this.gblBmsDeviceData=bmsDeviceData;
    this.gblAlarmsData=bmsDeviceData.bmsalarms;
    
  }
  /*
  @Input() set receivingAlarmsData( alarmsData: BMSAlarms)
  {
    console.warn("device-alarms2 called:"+JSON.stringify(alarmsData));
    if (alarmsData == null) {
      return;
    }
    this.gblAlarmsData = alarmsData;

  }*/



  ngOnInit(): void {
this.generalDataSubjectService.getGeneralData().subscribe((dta)=>{
  this.generalDataProcessing(dta);
});
  }


  /*************getting Data From Parent Component*********** */

  getArrayLength(dtaArray:any[])
  {
    try{
      return dtaArray.length.toString();
    }
    catch(err){
      return '--';
    }
  }
  getVoltageCount(deviceData: DeviceData,type: number) :CellVoltageTemperatureData[]
  {
    try{
      let  lclcellVoltageTemperatureData= deviceData.cellVoltageTemperatureData;

    if(type==0) //low
    {
      let rcvArray=lclcellVoltageTemperatureData.filter(d=>
        {
          if( d.cellTemperature<0) // this is for not communication.
          {
                return false;
          }
        if( d.cellVoltage<=this.cellThresholdValues.LowVoltage)
        {
          return true;
        }
        else
        {
          return false;
        }
        });

        return rcvArray;
    }
    else if(type==1) //Normal
    {
      let rcvArray=lclcellVoltageTemperatureData.filter(d=>
        {
        if( d.cellVoltage<=this.cellThresholdValues.LowVoltage)
        {
          return false;
        }
        else  if( d.cellVoltage>=this.cellThresholdValues.HighVoltage)
        {
          return false;
        }
        else
        {
          return true;
        }
        });

        return rcvArray;
    }
    else if(type==2)
    {
      let rcvArray=lclcellVoltageTemperatureData.filter(d=>
        {
          
        if( d.cellVoltage>=this.cellThresholdValues.HighVoltage)
        {
          return true;
        }
        else
        {
          return false;
        }
        });

        return rcvArray;
    }
  }
  catch(error)
  {
    return null;
  }
  }
  

  
  getTemperatureCount(deviceData: DeviceData,type: number)
  {
    try{
      let  lclcellVoltageTemperatureData= deviceData.cellVoltageTemperatureData;

    if(type==0) //low
    {
      let rcvArray=lclcellVoltageTemperatureData.filter(d=>
        {
        if( d.cellTemperature<=this.cellThresholdValues.LowTemperature)
        {
          return true;
        }
        else
        {
          return false;
        }
        });

        return rcvArray.length.toString();
    }
    else if(type==1) //Normal
    {
      let rcvArray=lclcellVoltageTemperatureData.filter(d=>
        {
        if( d.cellTemperature<=this.cellThresholdValues.LowTemperature)
        {
          return false;
        }
        else  if( d.cellTemperature>=this.cellThresholdValues.HighTemperature)
        {
          return false;
        }
        else
        {
          return true;
        }
        });

        return rcvArray.length.toString();
    }
    else if(type==2)
    {
      let rcvArray=lclcellVoltageTemperatureData.filter(d=>
        {
         
        if( d.cellTemperature>=this.cellThresholdValues.HighTemperature)
        {
          return true;
        }
        else
        {
          return false;
        }
        });

        return rcvArray.length.toString();
    }
  }
  catch(error)
  {
    return '--';
  }
  }
  


  getCommunicationgStatusCount(deviceData: DeviceData,type: number)
  {
  
    try{

      let  lclcellVoltageTemperatureData= deviceData.cellVoltageTemperatureData;

     // console.log("getCommunicationgStatusCount is:"+JSON.stringify(lclcellVoltageTemperatureData));
    if(type==0)  //not communicating
    {
     
      let lclNotCommnArray =lclcellVoltageTemperatureData.filter(d=>
        {
          //if(d.cellVoltage>=this.cellThresholdValues.NotCommnVoltage)
          if(d.cellVoltage<0)
          {
            return true;
          }
          else if(d.cellTemperature<0)
          {
            return true;
          }
          else{
              return false;
          } 
        });
      return lclNotCommnArray.length.toString();
    }
    else if(type==1)  // communicating
    {
      let lclCommnArray =lclcellVoltageTemperatureData.filter(d=>
        {
          if((d.cellVoltage>=0))
          {
            return true;
          }
          else if((d.cellTemperature>=0))
          {
            return true;
          }
          else{
              return false;
          } 
        });
      return lclCommnArray.length.toString();
    }
  }
  catch(erro)
  {
   return '--';
  }
  }

  getCellCount(deviceData: DeviceData)
  {
try{
  let lclAllarms=deviceData.cellVoltageTemperatureData;
return lclAllarms.length.toString();
}
catch(error)
{
  return '--'
}
  }

  /****************Normal Methods************************ */
  /*-----------------chargeDisharge -----------------*/
  chargeDischarge(bMSAlarms: BMSAlarms) {
try{
  let blnDta=bMSAlarms.bankCycleDC;
    if (blnDta == true) {
      return 'Discharging';
    } else if (blnDta == false) {
      return 'Charging';
    }
  }
  catch(error)
  {
    return '--';
  }
  }

  ngStyleChargeDischarge(bMSAlarms: BMSAlarms)
  {
    try {
   let blnDta=bMSAlarms.bankCycleDC;
   if(blnDta==true) //DisCharging
   {
   return {'color':'white','background-color':'red'};
   }
   else if(blnDta==false) //charging
   {
    return {'color':'white','background-color':'green'};
   }
   
    } catch (error) {
      return {'color':'white','background-color':'gray'};
    }
  }


/**************stateOfCharge********* */
stateOfCharge(bMSAlarms: BMSAlarms) {
  try{
    let blnDta=bMSAlarms.socLN; //1 for low and 0 -->normal
      if (blnDta == true) {
        return 'Low';
      } else if (blnDta == false) {
        return 'Normal';
      }
    }
    catch(error)
    {
      return '--';
    }
    }
  
    ngStyleStateOfCharge(bMSAlarms: BMSAlarms)
    {
      try {
     let blnDta=bMSAlarms.socLN; //1 for low and 0 -->normal
     if(blnDta==true) 
     {
     return {'color':'white','background-color':'red'};
     }
     else if(blnDta==false) 
     {
      return {'color':'white','background-color':'green'};
     }
     
      } catch (error) {
        return {'color':'white','background-color':'gray'};
      }
    }


/************************************ */


/**************String voltage********* */
stringVoltage(bMSAlarms: BMSAlarms) {
  try{
    let dta=bMSAlarms.stringVoltageLHN; //1 for low and 0 -->normal
    if (dta == 0) {
      return 'Low';
    } else if (dta == 1) {
      return 'Normal';
    } else if (dta == 2) {
      return 'High';
    } else {
      return dta;
    }
    }
    catch(error)
    {
      return '--';
    }
    }
  
ngStyleStringVoltage(bMSAlarms: BMSAlarms)
    {
      try {
     let dta=bMSAlarms.stringVoltageLHN; 
     if(dta==0)  //low
     {
     return {'color':'white','background-color':'red'};
     }
     else if(dta==1) //normal
     {
      return {'color':'white','background-color':'green'};
     }

     else if(dta==2) //high 
     {
      return {'color':'white','background-color':'red'};
     }
     
      } catch (error) {
        return {'color':'white','background-color':'gray'};
      }
    }


/************************************ */


/**************String commn status********* */
stringCurrent(bMSAlarms: BMSAlarms) {
  try{
    let dta=bMSAlarms.stringCurrentHN; //1 -->high and 0 -->normal
    if (dta == true) {
      return 'High';
    } else if (dta == false) {
      return 'Normal';
    }
  }
    catch(error)
    {
      return '--';
    }
    }
  
  ngStyleStringCurrent(bMSAlarms: BMSAlarms)
    {
      try {
     let dta=bMSAlarms.stringCurrentHN; //1 -->high and 0 -->normal
     if(dta==true)  //high
     {
     return {'color':'white','background-color':'red'};
     }
     else if(dta==false) //normal
     {
      return {'color':'white','background-color':'green'};
     }
      } catch (error) {
        return {'color':'white','background-color':'gray'};
      }
    }

/************************************ */


/**************String commn status********* */
StringComnStatus(bMSAlarms: BMSAlarms) {
  try{
    let dta=bMSAlarms.bmsSedCommunicationFD; // //1-->BMS-SED Communication fail and 0-->default state
    if (dta == true) {
      return 'Fail';
    } else if (dta == false) {
      return 'Communicating';
    }
  }
    catch(error)
    {
      return '--';
    }
    }
  
    ngStyleStringComnStatus(bMSAlarms: BMSAlarms)
    {
      try {
     let dta=bMSAlarms.bmsSedCommunicationFD; //1-->BMS-SED Communication fail and 0-->default state
     if(dta==true)  //fail
     {
     return {'color':'white','background-color':'red'};
     }
     else if(dta==false) //default
     {
      return {'color':'white','background-color':'green'};
     }
      } catch (error) {
        return {'color':'white','background-color':'gray'};
      }
    }

/************************************ */

/**************String commn status********* */
commonStatus(status: boolean) {
  try{
    //let dta=bMSAlarms.bmsSedCommunicationFD; // //1-->BMS-SED Communication fail and 0-->default state
    if (status) {
      return 'On';
    } else  {
      return 'OFF';
    }
  }
    catch(error)
    {
      return '--';
    }
    }
  
    ngStyleCommonStatus(status: boolean)
    {
      try {
    // let dta=bMSAlarms.bmsSedCommunicationFD; //1-->BMS-SED Communication fail and 0-->default state
   if(status) //default
     {
      return {'color':'white','background-color':'green'};
     }else{
      return {'color':'white','background-color':'red'};
     }
      } catch (error) {
        return {'color':'white','background-color':'gray'};
      }
    }

/************************************ */




/**************cell commn status********* */
CellComnStatus(bMSAlarms: BMSAlarms) {
  try{
    let dta=bMSAlarms.cellCommunicationFD; //1-->cell comm fail and 0-->default state
    if (dta == true) {
      return 'Fail';
    } else if (dta == false) {
      return 'Communicating';
    }
  }
    catch(error)
    {
      return '--';
    }
    }
  
ngStyleCellComnStatus(bMSAlarms: BMSAlarms)
    {
      try {
     let dta=bMSAlarms.cellCommunicationFD; //1-->cell comm fail and 0-->default state
     if(dta==true)  //fail
     {
     return {'color':'white','background-color':'red'};
     }
     else if(dta==false) //default
     {
      return {'color':'white','background-color':'green'};
     }
      } catch (error) {
        return {'color':'white','background-color':'gray'};
      }
    }

/************************************ */





/**************cell Voltage********* */
cellVoltage(bMSAlarms: BMSAlarms) {
  try{
    let dta=bMSAlarms.cellVoltageLHN;
    if (dta == 0) {
      return 'Low';
    } else if (dta ==1) {
      return 'Normal';
    }
    else if (dta ==2) {
      return 'High';
    }
  }
    catch(error)
    {
      return '--';
    }
    }
  
  ngStyleCellVoltage(bMSAlarms: BMSAlarms)
    {
      try {
     let dta=bMSAlarms.cellVoltageLHN; 
     if(dta==0)  
     {
     return {'color':'white','background-color':'red'};
     }
     else if(dta==1)
     {
      return {'color':'white','background-color':'green'};
     }

     
     else if(dta==2)
     {
      return {'color':'white','background-color':'red'};
     }
      } catch (error) {
        return {'color':'white','background-color':'gray'};
      }
    }

/************************************ */



/**************cell commn status********* */
cellTemperature(bMSAlarms: BMSAlarms) {
  try{
    let dta=bMSAlarms.cellTemperatureHN; //1-->hight and 0 -->Normall
    if (dta == true) {
      return 'High';
    } else if (dta == false) {
      return 'Normal';
    }
  }
    catch(error)
    {
      return '--';
    }
    }
  
    ngStyleCellTemperature(bMSAlarms: BMSAlarms)
    {
      try {
     let dta=bMSAlarms.cellTemperatureHN; //1-->hight and 0 -->Normall
     if(dta==true)  //High
     {
     return {'color':'white','background-color':'red'};
     }
     else if(dta==false) //Normal
     {
      return {'color':'white','background-color':'green'};
     }
      } catch (error) {
        return {'color':'white','background-color':'gray'};
      }
    }

/************************************ */



/**************Ambient temperature********* */
ambientTemperature(bMSAlarms: BMSAlarms) {
  try{
    let dta=bMSAlarms.ambientTemperatureHN; //1-->hight and 0 -->Normall
    if (dta == true) {
      return 'High';
    } else if (dta == false) {
      return 'Normal';
    }
  }
    catch(error)
    {
      return '--';
    }
    }
  
ngStyleAmbientTemperature(bMSAlarms: BMSAlarms)
    {
      try {
     let dta=bMSAlarms.ambientTemperatureHN; //1-->hight and 0 -->Normall
     if(dta==true)  //High
     {
     return {'color':'white','background-color':'red'};
     }
     else if(dta==false) //Normal
     {
      return {'color':'white','background-color':'green'};
     }
      } catch (error) {
        return {'color':'white','background-color':'gray'};
      }
    }

/************************************ */




  

 






  /*-------------------------------------------------------- */
  /*--------------------Colour Change------------------------------------ */
  booleanTocolour(dta: boolean) {
    if (dta == true) {
      return { color: 'green' };
    } else if (dta == false) {
      return { color: 'red' };
    } else {
      return { color: 'black' };
    }
  }

  intToColourChange(dta: number) {
    if (dta == 0) {
      return { color: 'red' };
    } else if (dta == 1) {
      return { color: 'black' };
    } else if (dta == 0) {
      return { color: 'green' };
    } else {
      return { color: 'orange' };
    }
  }
  /*-------------------------------------------------------------------- */
  /***************************************************** */
}
