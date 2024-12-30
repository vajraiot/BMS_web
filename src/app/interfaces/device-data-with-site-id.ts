import { DeviceData } from './device-data';

export interface DeviceDataWithSiteId {
  siteId: string;
  packetDateTime: Date;
  deviceData: DeviceData;
}
