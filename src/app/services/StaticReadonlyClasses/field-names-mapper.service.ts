import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
 })
 export class FieldNamesMapperService {
  private constructor(public readonly frendlyName: string, public readonly units: string) {
  }
   ​public static readonly id = new FieldNamesMapperService('Identification', '—');
   public static readonly deviceId = new FieldNamesMapperService('Device Identification', '—');
   public static readonly bmsManufacturerID = new    FieldNamesMapperService('BMS Manufacture ID', '--');
   public static readonly serialNumber = new FieldNamesMapperService('Serial Number', '--');
   public static readonly installationDate= new FieldNamesMapperService('Installation Date', '--');
   public static readonly cellsConnectedCount= new FieldNamesMapperService('Cells Connected Count', '--');
   public static readonly problemCells= new FieldNamesMapperService('Problem Cells', '—');
   public static readonly stringvoltage= new FieldNamesMapperService('String Voltage', '—');
   public static readonly systemPeakCurrentInChargeOneCycle= new FieldNamesMapperService('Peak Current In Charge Cycle', '—');
   public static readonly averageDischargingCurrent= new FieldNamesMapperService('Average Discharging Current', '--'); 
   public static readonly averageChargingCurrent= new FieldNamesMapperService('Average Charging Current', '—');
   public static readonly ahInForOneChargeCycle= new FieldNamesMapperService('AH Out For Charge Cycle', '—');
   public static readonly ahOutForOneDischargeCycle= new FieldNamesMapperService('AH Out For Discharge Cycle', '—');
   public static readonly cumulativeAHIn= new FieldNamesMapperService('Cumulative AH In', '—');
   public static readonly cumulativeAHOut= new FieldNamesMapperService('Cumulative AH Out', '—');
   public static readonly chargeTimeCycle= new FieldNamesMapperService('Charge Time Cycle', '—');
   public static readonly dischargeTimeCycle= new FieldNamesMapperService('Discharge Time Cycle', '—');
   public static readonly totalChargingEnergy= new FieldNamesMapperService('Total Charging Energy', '—');
   public static readonly totalDischargingEnergy= new FieldNamesMapperService('Total Discharging Energy', '—');
   public static readonly everyHourAvgTemp= new FieldNamesMapperService('Every Hour Average Temperature', '—');
   public static readonly cumulativeTotalAvgTempEveryHour= new FieldNamesMapperService('Cumulative Total Average Temperature Every Hour', '--');
   public static readonly chargeOrDischargeCycle= new FieldNamesMapperService('Charge Or Discharge Cycle', '—');
   public static readonly socLatestValueForEveryCycle= new FieldNamesMapperService('State of Charge', '--');
   public static readonly dodLatestValueForEveryCycle= new FieldNamesMapperService('Depth of Discharge', '--');
   public static readonly systemPeakCurrentInDischargeOneCycle= new FieldNamesMapperService('Peak Current In Discharge Cycle', '--');
   public static readonly instantaneousCurrent= new FieldNamesMapperService('Instantaneous Current', '--');
   public static readonly ambientTemperature= new FieldNamesMapperService('Ambient Temperature', '--');
   public static readonly batteryRunHours= new FieldNamesMapperService('Battery Run Hours', '--');
 }