import { SerialNumberList,SiteLocation } from '.';

export interface SiteIdList {
  id: number;
  siteId: string;
  lstSerialNumberList: SerialNumberList[];
  siteLocation: SiteLocation;
  serverTime: Date;
}
