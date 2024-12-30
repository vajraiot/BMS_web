import { BMSAlarms } from './bmsalarms';
import { CellVoltageTemperatureData } from './cell-voltage-temperature-data';
export interface DeviceData {
  id: number;
  deviceId: number;
  bmsManufacturerID: number;
  serialNumber: string;
  installationDate: string;
  bMSAlarmsString: string;
  cellsConnectedCount: number;
  problemCells: number;
  stringvoltage: number;
  systemPeakCurrentInChargeOneCycle: number;
  averageDischargingCurrent: number;
  averageChargingCurrent: number;
  ahInForOneChargeCycle: number;
  ahOutForOneDischargeCycle: number;
  cumulativeAHIn: number;
  cumulativeAHOut: number;
  chargeTimeCycle: number;
  dischargeTimeCycle: number;
  totalChargingEnergy: number;
  totalDischargingEnergy: number;
  everyHourAvgTemp: number;
  cumulativeTotalAvgTempEveryHour: number;
  chargeOrDischargeCycle: number;
  socLatestValueForEveryCycle: number;
  dodLatestValueForEveryCycle: number;
  systemPeakCurrentInDischargeOneCycle: number;
  instantaneousCurrent: number;
  ambientTemperature: number;
  batteryRunHours: number;
  serverTime: Date;

  bmsalarms: BMSAlarms;
  cellVoltageTemperatureData: CellVoltageTemperatureData[];
  bmsalarmsString: string;
  
}
