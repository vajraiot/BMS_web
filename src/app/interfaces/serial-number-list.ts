import { PlainManufacturerDetails } from '.';
import { CellThresholdValues } from './cell-threshold-values';

export interface SerialNumberList {
  id: number;
  serialNumber: string;
  manufacturerDetails:PlainManufacturerDetails[];
  cellThresholdValue: CellThresholdValues;
}
