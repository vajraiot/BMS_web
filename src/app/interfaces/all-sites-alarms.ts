import { BMSAlarms } from './bmsalarms';

export interface AllSitesAlarms extends BMSAlarms {
  siteId: string;
  serialNumber: string;
}
