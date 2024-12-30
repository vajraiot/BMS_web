export enum CellThresholdValuesEnum {
  HighVoltage = 2.3,
  LowVoltage = 2.0,
 
  //HighVoltage = 12.25,

  //LowVoltage = 10,
  HighTemperature = 40,
  LowTemperature = 18,

  //NotCommnVoltage = 60,   
  //NotCommnTemperature =60000 ,

  NotCommnVoltage = -1,
  NotCommnTemperature = -1,

  BatteryAboutToDie = 1.85,
  OpenBattery = 1.75,


  /** Threshold values for 12V batery type */
  HighVoltage_12V = 14.5,
  LowVoltage_12V = 20.0,
 
  //HighVoltage = 12.25,

  //LowVoltage = 10,
  HighTemperature_12V = 45,
  LowTemperature_12V = 20,

  //NotCommnVoltage = 60,   
  //NotCommnTemperature =60000 ,

  NotCommnVoltage_12V = 0,
  NotCommnTemperature_12V = 0,

  BatteryAboutToDie_12V = 9.5,
  OpenBattery_12V =9,
}
