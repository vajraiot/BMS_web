export interface BMSAlarms {
  id: number;
  bankCycleDC: boolean;
  ambientTemperatureHN: boolean;
  socLN: boolean;
  stringVoltageLHN: number;
  stringCurrentHN: boolean;
  bmsSedCommunicationFD: boolean;
  cellCommunicationFD: boolean;
  cellVoltageLHN: number;
  cellTemperatureHN: boolean;
  buzzer:boolean;
  ebStatus: boolean;
  dgStatus: boolean;
 // serverTime: Date;
}
