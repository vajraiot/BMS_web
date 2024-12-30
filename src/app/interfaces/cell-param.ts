import { CellVoltageTemperatureData } from './cell-voltage-temperature-data';
export interface CellParam {
  id: number;
  siteId: string;
  serialNumber: string;
  lstCellVoltageTemperatureData: CellVoltageTemperatureData[];
}
