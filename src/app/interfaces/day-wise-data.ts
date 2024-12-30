export interface DayWiseData {
    deviceId: number;
    dayWiseDate: Date;
    chargeOrDischargeCycle: number;
    cumulativeAHIn: number;
    cumulativeAHOut: number;
    totalChargingEnergy: number;
    totalDischargingEnergy: number;
    batteryRunHours: number;
}
