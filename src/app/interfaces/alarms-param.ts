export interface AlarmsParam {
    id?: any;
    siteId: string;
    serialNumber: string;
    bankCycle: string;
    ambientTemperature: string;
    soc: string;
    stringVoltage: string;
    stringCurrent: string;
    bmsSedCommunication: string;
    cellCommunication: string;
    cellVoltage: string;
    cellTemperature: string;
    packetDateTime: Date;
    serverTime?: any;
    bmsalarmsString: string;
    buzzer:string;
}
