import { Component, OnInit, Input } from '@angular/core';
import { BMSAlarms } from '../../../../interfaces';

@Component({
  selector: 'app-device-alarm',
  templateUrl: './device-alarm.component.html',
  styleUrls: ['./device-alarm.component.css'],
})
export class DeviceAlarmComponent implements OnInit {
  constructor() {}
  @Input('receivingAlarmsData') alarmsData:BMSAlarms;

  ngOnInit(): void {
    console.log("insidie the app-device-alarm");

    console.log('in receivingAlarmsData is:' + JSON.stringify(this.alarmsData));

    if (this.alarmsData == null) {
      return;
    }
    this.gblAlarmsData = this.alarmsData;
  }

  /*********************Global Variable*********************** */
  gblAlarmsData: BMSAlarms;
  /*********************************************************** */
  /*************getting Data From Parent Component*********** */


  

  /****************Normal Methods************************ */
  /*-----------------value to String changes-----------------*/
  chargeDischarge(dta: boolean) {
    if (dta == true) {
      return 'Discharging';
    } else if (dta == false) {
      return 'Charging';
    } else {
      return dta;
    }
  }
  stateOfCharge(dta:boolean) {
    if (dta == true) { //1 for low and 0 -->normal
      return 'Low';
    } else if (dta == false) {
      return 'Normal';
    } else {
      return dta;
    }
  }

  stringVoltage(dta: number) {
    if (dta == 0) {
      return 'Low';
    } else if (dta == 1) {
      return 'Normal';
    } else if (dta == 2) {
      return 'High';
    } else {
      return dta;
    }
  }

  stringCurrent(dta: boolean) {
    if (dta == true) { //1 -->high and 0 -->normal
      return 'High';
    } else if (dta == false) {
      return 'Normal';
    } else {
      return dta;
    }
  }

  StringComnStatus(dta: boolean) {
    if (dta == true) { //1-->BMS-SED Communication fail and 0-->default state
      return 'Fail';
    } else if (dta == false) {
      return 'Default';
    } else {
      return dta;
    }
  }

  CellComnStatus(dta: boolean) {
    if (dta == true) { //1-->cell comm fail and 0-->default state
      return 'Fail';
    } else if (dta == false) {
      return 'Default';
    } else {
      return dta;
    }
  }

  cellVoltage(dta:number)
  {
    if (dta == 0) {
      return 'Low';
    } else if (dta == 1) {
      return 'Normal';
    } else if (dta == 2) {
      return 'High';
    } else {
      return dta;
    }
  }

  cellTemperature(dta:boolean)
  {
    if (dta == true) { //1-->hight and 0 -->Normall
      return 'High';
    } else if (dta == false) {
      return 'Normal';
    } else {
      return dta;
    }
  }

  AmbientTemperature(dta:boolean)
  {

    if (dta == true) {
      return 'High';
    } else if (dta == false) {
      return 'Normal';
    } else {
      return dta;
    }
  }
  /*-------------------------------------------------------- */
  /*--------------------Colour Change------------------------------------ */
  booleanTocolour(dta: boolean) {
    if (dta == true) {
      return { color: 'green' };
    } else if (dta == false) {
      return { color: 'red' };
    } else {
      return { color: 'black' };
    }
  }

  intToColourChange(dta: number) {
    if (dta == 0) {
      return { color: 'red' };
    } else if (dta == 1) {
      return { color: 'black' };
    } else if (dta == 0) {
      return { color: 'green' };
    } else {
      return { color: 'orange' };
    }
  }
  /*-------------------------------------------------------------------- */
  /***************************************************** */
}
