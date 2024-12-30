import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerFieldNamesService {

  private constructor(public readonly frendlyName: string, public readonly units: string) {
  }
   ​public static readonly siteId = new ManufacturerFieldNamesService('Site Name', '—');

   ​public static readonly serialNumber = new ManufacturerFieldNamesService('Serial Number', '—');

   ​public static readonly firstUsedDate = new ManufacturerFieldNamesService('Fist Used Date', '—');

   ​public static readonly batterySerialNumber = new ManufacturerFieldNamesService('Battery Serial Number', '—');

   ​public static readonly batteryBankType = new ManufacturerFieldNamesService('Battery Bank Type', '—');

   ​public static readonly ahCapacity = new ManufacturerFieldNamesService('Ah Capacity', '—');

   ​public static readonly manifactureName = new ManufacturerFieldNamesService('Manufacturer Name', '—');

   ​public static readonly designVoltage = new ManufacturerFieldNamesService('Design Voltage', '—');

   ​public static readonly individualCellVoltage = new ManufacturerFieldNamesService('Individual Cell Voltage', '—');

   ​public static readonly serverTime = new ManufacturerFieldNamesService('Server Time', '—');

  
}
