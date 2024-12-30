export interface StringParam {
  id: number;

  siteId: string;

  serialNumber: string;

  deviceId: number;
  bmsManufacturerID: number;

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
}
