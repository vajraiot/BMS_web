export interface CellVoltageTemperatureData {
  id?: number;
  cellNumber: number;
  cellVoltage: number;
  cellTemperature: number;
  serverTime?: Date;
}
