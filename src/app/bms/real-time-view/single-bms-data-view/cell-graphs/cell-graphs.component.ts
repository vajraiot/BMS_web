import { Component, OnInit, Input } from '@angular/core';

import * as Highcharts from 'highcharts';
import { GeneralDataSubjectService } from 'src/app/services';
import { CellVoltageTemperatureData, DeviceData, GeneralData } from '../../../../interfaces';
declare var require: any;

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
require('highcharts/modules/heatmap')(Highcharts);
require('highcharts/modules/treemap')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);

//require('highcharts/modules/series-label')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);

@Component({
  selector: 'app-cell-graphs',
  templateUrl: './cell-graphs.component.html',
  styleUrls: ['./cell-graphs.component.css'],
})
export class CellGraphsComponent implements OnInit {
  constructor(private generalDataSubjectService:GeneralDataSubjectService) {
    console.log('CellGraphsComponent constructor....');
  }

  ngOnInit(): void {
    this.generalDataSubjectService.getGeneralData().subscribe((dta)=>{
      this.generalDataProcessing(dta);
    });
  }
  /*********************Global Variable*********************** */
  gblCellsData: CellVoltageTemperatureData[];
  gblDivTagIdName: any;
  /*********************************************************** */
  /*************getting Data From Parent Component*********** */

  generalDataProcessing(genearalData:GeneralData)
{
  try{
  this.deviceDataProcessing(genearalData.deviceData[0]);
  }
  catch(err)
  {
    console.error("error occured in all cells pictorial representation.");  
  }
}
deviceDataProcessing(bmsDeviceData: DeviceData)
{
  this.receivingCellData(bmsDeviceData.cellVoltageTemperatureData);
}
  //@Input() set 
  receivingCellData(cellsData: CellVoltageTemperatureData[]) {
    
    this.gblCellsData=cellsData;

    //this.gblDivTagIdName = 'checks';
  //  this.dynamicDivTagCreate(this.gblDivTagIdName);
    this.highchartGraphs();
  }

  /********************************************************** */
  dynamicDivTagCreate(idName) {
    var newId = document.getElementById(idName);
    if (typeof newId != 'undefined' && newId != null) {
      return;
    }

    var board = document.createElement('div');
    board.className = 'containernew';
    board.id = idName;
    board.style.width = '990px';
    board.style.height = '350px';
    var container = document.getElementById('cnt');
    container.appendChild(board);
    console.log('new Div tag create with name:' + idName);
  }

  changeDivIdName(idName) {
    var newId = document.getElementById(idName);
    if (typeof newId != 'undefined' && newId != null) {
      return;
    }
    var oldDiv = document.getElementById('cnt');
    oldDiv.innerHTML = Date();
    oldDiv.setAttribute('id', idName);
}
  /*****************************************Highchart Graphs************************************************** */
  highchartGraphs() {
    if (this.gblCellsData == null) {
      return;
    }
    
    Highcharts.chart("voltageGraphs", this.higchartVotageCell());
    Highcharts.chart("tempGraphs", this.higchartTempCell());

    /*$(document).ready(function () {
      this.higchartCell(cellsData);
    }); */
  }

  higchartVotageCell() :any {
    let lclChart = this.cellVoltageChart;
    lclChart.xAxis.categories = this.getCellNumberArray();
    let insttitle = '';
    insttitle = 'cell Voltage';

    lclChart.title = {
      text: insttitle,
    };

    lclChart.yAxis = {
      title: {
        text: 'Values',
      },
    };
      
      lclChart.series[0] = {
        type: 'column',
        name: 'Voltage',
        data: this.getVoltageArray(),
        color: '#eaff00', //new yellow color
      };
               
      return lclChart;
   //  Highcharts.chart(this.gblDivTagIdName, this.cellVoltageChart);
  }

  higchartTempCell():any {
    let lclChart = this.cellVoltageChart;
    lclChart.xAxis.categories = this.getCellNumberArray();
    let insttitle = '';
    insttitle = 'cell Temperature';

    lclChart.title = {
      text: insttitle,
    };

    lclChart.yAxis = {
      title: {
        text: 'Values',
      },
    };
    lclChart.series[0] = {
      //type: 'column',
      type: 'column',
      name: 'Temperature',
      data: this.getTemperatureArray(),
      color: '#00baf7', //skyblue color
    };
               
      return  lclChart;
   //  Highcharts.chart(this.gblDivTagIdName, this.cellVoltageChart);
  }
  /*/------------------------Chart------------------/*/
  public cellVoltageChart: any = {
    chart: {},
    credits: {
      enabled: false,
    },

    subtitle: {
      text: '',
    },

    yAxis: {
      title: {
        text: 'Volt/Temp',
      },
    },

    xAxis: {
      categories: [],
      scrollbar: {
        enabled: true,
      },
    },
    plotOptions: {
      series: {
        shadow: true,
        borderWidth: 0,
        dataLabels: {
          rotation: 270,
          enabled: true,
          //format: '{point.y:.1f}%'
          format: '{point.y}',
          style: {
            fontSize: '9px',
            fontWeight: 'lighter',
          },
          
         },
        },
      },

    series: [],
  };

  public cellTempChart: any = {
    chart: {},
    credits: {
      enabled: false,
    },

    subtitle: {
      text: '',
    },

    yAxis: {
      title: {
        text: 'Volt/Temp',
      },
    },

    xAxis: {
      categories: [],
      scrollbar: {
        enabled: true,
      },
    },
    plotOptions: {
      series: {
        shadow: true,
        borderWidth: 0,
        dataLabels: {
          rotation: 270,
          enabled: true,
          //format: '{point.y:.1f}%'
          format: '{point.y}',
          style: {
            fontSize: '9px',
            fontWeight: 'lighter',
          },
          
         },
        },
      },

    series: [],
  };
  /************************************************************************************************************/

  /*************************Regular Methods**************************************** */
  getVoltageArray() {

    let str = this.gblCellsData;
    let rtnArray = [];
    for (let i = 0; i < str.length; i++) {
      //console.log("str[i].totalFillings :"+str[i].totalFillings);
      let vlt= str[i].cellVoltage;
      if(vlt>55)
      {
        vlt=-1;
      }
      rtnArray[i] =vlt;
    }

    console.log('getVoltageArray is:' + rtnArray);
    return rtnArray;
  }

  getTemperatureArray() {
    let str = this.gblCellsData;
    let rtnArray = [];
    for (let i = 0; i < str.length; i++) {
      //console.log("str[i].totalFillings :"+str[i].totalFillings);
      

      let vlt= str[i].cellTemperature;
      if(vlt>55)
      {
        vlt=-1;
      }
      rtnArray[i] =vlt;
    }
    console.log('getTemperatureArray is:' + rtnArray);
    return rtnArray;
  }
  getCellNumberArray() {
    const str = this.gblCellsData;
    let rtnArray = [];
    for (let i = 0; i < str.length; i++) {
      //console.log("str[i].totalFillings :"+str[i].totalFillings);
      rtnArray[i] = str[i].cellNumber;
    }
    console.log('getCellNumberArray is:' + rtnArray);
    return rtnArray;
  }
  /******************************************************************************** */
}
