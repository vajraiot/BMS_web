import { CellThresholdValues } from './cell-threshold-values';
import { DeviceData } from './device-data';

export interface GeneralData {
  id: number;
  startPacket: string;
  protocalVersion: string;
  dataIdentifier: string;
  siteId: string;
  packetDateTime: Date;
  deviceData: DeviceData[];
  cellThresholdValue: CellThresholdValues;
  
}
