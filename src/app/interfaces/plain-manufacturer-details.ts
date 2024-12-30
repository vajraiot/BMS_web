import { CellThresholdValues } from "./cell-threshold-values";

export interface PlainManufacturerDetails {
    id: number;
    siteId: string;
    serialNumber: string;
    firstUsedDate: string;
    batterySerialNumber: string;
    batteryBankType: string;
    ahCapacity: string;
    manifactureName: string;
    individualCellVoltage: string;
    serverTime: Date;
    designVoltage: string;
    cellThresholdValue:CellThresholdValues;
}
