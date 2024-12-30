import { GeneralData, SiteLocation } from './';
export interface CommnStatus {
  siteId: string;
  statusType: number;
  generalData: GeneralData;
  siteLocation: SiteLocation;
}
