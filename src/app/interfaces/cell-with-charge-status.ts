import { CellVoltageTemperatureData } from '.';

export interface CellWithChargeStatus {
  ChargingStatus: boolean;
  CellVoltageTemperatureData: CellVoltageTemperatureData;
}
