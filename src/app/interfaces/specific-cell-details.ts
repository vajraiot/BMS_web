export interface SpecificCellDetails {
    id: number;
    siteId: string;
    serialNumber: string;
    cellNumber: number;
    cellVoltage: number;
    cellTemperature: number;
    packetDateTime: Date;
    serverTime: Date;
}
