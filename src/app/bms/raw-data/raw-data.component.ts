import { Component, OnInit, ViewChild } from '@angular/core';
import { RawDataService } from '../../services/Api/raw-data.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { UserDataInterFace } from '../../interfaces/user-data-inter-face';
@Component({
  selector: 'app-raw-data',
  templateUrl: './raw-data.component.html',
  styleUrls: ['./raw-data.component.css']
})
export class RawDataComponent implements OnInit {

  constructor(private rawDataService: RawDataService, private router: Router) { }

  ngOnInit() {

    this.serviceGetRawdataWithSearchingKeywordOrderByServerTimePg(0, 20);


  }

  /**********************************Globlar Variable********************************** */
  SpinnerVisible: any;

  // displayedColumns = ['serverTime','rawdata','parsed'];
  displayedColumns = ['serverTime'];
  dataSource: MatTableDataSource<UserDataInterFace>;
  pageEvent: PageEvent;

  selectedRowIndex: any;

  PageNumber: any;
  PageSize: any;
  TotalPages: any;
  LastTime: any;

  RowscountperTable: any;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  splittedDataArray: any;

  str: string;

  strrawData: any;

  selectedColoumnData: any;

  interval: any;
  searchKeyWordControl = new FormControl();
  searchingKeyWordInput = '';

  /*************************************************************************************/


  /**********************************Service Methods********************************** */
  serviceGetAllRawDataByServerTimePg(pgnmbr: any, PgSz: any) {
    this.SpinnerVisible = 1;
    this.rawDataService.GetAllRawPacketByServerTimePg(pgnmbr, PgSz).subscribe(

      data => {
        this.SpinnerVisible = 0;
        this.processingData(data);
        //  alert(JSON.stringify(data[0]));
        // this.ftmsData=data[0];




      },
      err => {
        this.SpinnerVisible = 0;
        console.log(' fetch error : ' + err);
      }

    )
  }


  serviceGetRawdataWithSearchingKeywordOrderByServerTimePg(pgnmbr: any, PgSz: any) {
    this.SpinnerVisible = 1;

    this.rawDataService.GetRawdataWithSearchingKeywordOrderByServerTimePg(pgnmbr, PgSz, this.searchingKeyWordInput).subscribe(

      data => {
        this.SpinnerVisible = 0;
        this.processingData(data);
      },
      err => {
        this.SpinnerVisible = 0;
        console.log(' fetch error : ' + err);
      }

    )
  }


  /*************************************************************************************/



  /**********************************Event Methods ********************************** */
  RefreshButton() {
    this.paginator.pageIndex = 0;//this is for initial
    this.serviceGetRawdataWithSearchingKeywordOrderByServerTimePg(0, this.RowscountperTable);
  }

  public handlePage(e: any) {


    console.log(" e.totalPages..." + e.totalPages);
    console.log(" e.pageIndex..." + e.pageIndex);

    console.log("  e.pageSize  " + e.pageSize);

    this.RowscountperTable = e.pageSize;
    this.serviceGetRawdataWithSearchingKeywordOrderByServerTimePg(e.pageIndex, e.pageSize);
    //this.GetuserData(e.pageIndex, e.pageSize)
    // this.GetDatbetweenthDate(this.gstartdate,this.gEndDate ,e.pageIndex, e.pageSize);

  }

  getRecord(coloumnData: any) {
    //this.rawdatapacket=coloumnData.rawdata;
    console.log("row id is:" + coloumnData.id);
    this.selectedRowIndex = coloumnData.id;
    this.selectedColoumnData = coloumnData
    this.splittedDataArray = this.splictbycaracter(coloumnData.rawdata);
    //document.getElementById("dvRawData").innerHTML ='RawData:'+coloumnData.rawdata;
    //this.SelectedRecordData=coloumnData;//this is for child component.
  }

  sliderOnChange(value) {

    if (value.checked === true) {
      console.clear();
      console.log("slide on");

      this.routerOnActivate()
    } else {
      console.log("slide off");

      this.routerOnDeactivate()
    }
  }
  /*************************************************************************************/



  /**********************************Normal Methods********************************** */

  processingData(datasrc: any) {
    // console.log("receved data is:" + JSON.stringify(datasrc));
    console.log("processingData is:" + JSON.stringify(datasrc))
    this.dataSource = datasrc.content;

    this.PageNumber = datasrc.page.number;
    this.PageSize = datasrc.page.size;
    this.TotalPages = datasrc.page.totalElements;

    this.updateTime();
  }

  convertOwlDatetimeToCustomDate(str) {

    if (str == '') {
      return '';
    }

    var date = new Date(str),
      yr = (date.getFullYear()),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2),
      hour = ("0" + date.getHours()).slice(-2),
      minutes = ("0" + date.getMinutes()).slice(-2),
      seconds = ("0" + date.getSeconds()).slice(-2);


    return yr + "-" + mnth + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    //  return  day+"/"+mnth+"/"+yr +" "+hour+":"+minutes+":"+seconds;
    // return [date.getFullYear(), mnth, day].join("-");
  }

  hex2Ascii(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }


  splictbycaracter(hexstring: string) {


    var arraystring = [];
    arraystring = hexstring.split('2C');

    return arraystring;
  }

  stringPadding(val: any) {
    if (val < 9) {
      return '0' + val
    }
    else {
      return val;
    }

  }

  public getColor(row) {
    if (row.parsed == false) {
      return { 'background-color': '#ce75758f', };
    }
    else {
      return { 'background-color': '#9dce758f', };

    }

  }


  routerOnActivate() {
    this.interval = setInterval(() => {
      // this.refresh(); // api call

      this.paginator.pageIndex = 0;//this is for initial
      this.serviceGetRawdataWithSearchingKeywordOrderByServerTimePg(0, this.RowscountperTable);
      console.log("autorefresh called..");
    }, 1000);


  }

  routerOnDeactivate() {
    console.log("autorefresh destoyed..");
    clearInterval(this.interval);
  }


  updateTime() {
    //this.LastTime = Date.now();

    var today = new Date();
    this.LastTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //this.blink();
  }

  parsedStatues(lclisparsed: any) {
    if (lclisparsed == true) {
      return 'Parsed'
    }
    else if (lclisparsed == false) {
      return 'Unparsed ';
    }
    else {
      return lclisparsed;
    }

  }

  trackById(index: number, item: FtmsDataInterface) {
    return item.id
  }
  /*************************************************************************************/
}

interface FtmsDataInterface {
  id: string;
  imeiNumber: string;
  serialNumber: number;

  latitude: string;
  longnitude: string;
  packetDateTime: number;

  fuelLevelLtrs: string;
  serverTime: string;

}
