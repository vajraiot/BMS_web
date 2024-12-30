import { Injectable } from '@angular/core';
import { ConvertersService } from '../../services/CommonUtilities/converters.service';

@Injectable({
  providedIn: 'root'
})
export class InstantaneousGraphsService {

  constructor(private convertersService:ConvertersService) { }

/*-----------------Charts  Explicit Changes----------------------------------- */
higchartStringVoltage(dta: any) {
  let rtnChart = this.StringVoltageChart;
   
  rtnChart.xAxis.categories = this.getPacketTimeSeriesArray(dta);
  let insttitle = 'Instantaneous Voltage Graph';

  rtnChart.title = {
   text: insttitle,
 };

 rtnChart.yAxis = {
   title: {
     text: 'Voltage',
   },
 }

 rtnChart.series[0] = {
   name: 'String Voltage',
   data: this.getStringVoltageArray(dta),
   color: '#00baf7', //skyblue color
 }
   return rtnChart;
 }


 higchartCurrent(dta: any) {
  let rtnChart = this.CurrentChart;
   
  rtnChart.xAxis.categories = this.getPacketTimeSeriesArray(dta);
  let insttitle = 'Instantaneous Current Graph';

  rtnChart.title = {
   text: insttitle,
 };

 rtnChart.yAxis = {
   title: {
     text: 'Values',
   },
 }

 rtnChart.series[0] = {
   name: 'String Voltage',
   data: this.getInstantaneousCurrentArray(dta),
   color: '#00baf7', //skyblue color
 }
   return rtnChart;
 }

 
 higchartTemperatureChart(dta: any) {
  let rtnChart = this.temperatureChart;
   
  rtnChart.xAxis.categories = this.getPacketTimeSeriesArray(dta);
  let insttitle = 'Instantaneous Temperature Graph';

  rtnChart.title = {
   text: insttitle,
 };
 
 rtnChart.yAxis = {
   title: {
     text: 'Temperature',
   },
 }

 rtnChart.series[0] = {
   name: 'Temperature',
   data: this.getAmbientTemperatureArray(dta),
   color: '#00baf7', //skyblue color
 }
   return rtnChart;
 }
 /*--------------------------------------------------------------------------- */
 /*--------------------------Charts-------------------------------------- */
 public StringVoltageChart: any = {
   chart: {
     type: 'spline',
     //      animation: Highcharts.svg, // don't animate in old IE
     marginRight: 10,
     
   },

   credits: {  //to hide highcartSymbol
    enabled: false
  },

   time: {
     useUTC: false,
   },

   title: {
     text: 'Instantaneous Voltage Value',
   },

   accessibility: {
     announceNewData: {
       enabled: true,
       minAnnounceInterval: 1,
       announcementFormatter: function (allSeries, newSeries, newPoint) {
         if (newPoint) {
           console.log("Got new point"+(newPoint.x)+" "+(newPoint.y));
           return 'New point added. Value: ' + newPoint.y;
         }
         return false;
       },
     },
   },

   xAxis: {
     type: 'datetime',
     tickPixelInterval: 15,
   },

   yAxis: {
     title: {
       text: 'Voltage',
     },
     plotLines: [
       {
         value: 0,
         width: 1,
         color: '#808080',
       },
     ],
   },

   tooltip: {
     headerFormat: '<b>{series.name}</b><br/>',
     pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}',
   },

   legend: {
     enabled: false,
   },

   exporting: {
     enabled: false,
   },

   series: [],
 };

 public CurrentChart: any = {
  chart: {
    type: 'spline',
    //      animation: Highcharts.svg, // don't animate in old IE
    marginRight: 10,
    
  },

  credits: {  //to hide highcartSymbol
    enabled: false
  },
  time: {
    useUTC: false,
  },

  title: {
    text: 'Instantaneous Current Value',
  },

  accessibility: {
    announceNewData: {
      enabled: true,
      minAnnounceInterval: 1,
      announcementFormatter: function (allSeries, newSeries, newPoint) {
        if (newPoint) {
          console.log("Got new point"+(newPoint.x)+" "+(newPoint.y));
          return 'New point added. Value: ' + newPoint.y;
        }
        return false;
      },
    },
  },

  xAxis: {
    type: 'datetime',
    tickPixelInterval: 15,
  },

  yAxis: {
    title: {
      text: 'Voltage',
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: '#808080',
      },
    ],
  },

  tooltip: {
    headerFormat: '<b>{series.name}</b><br/>',
    pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}',
  },

  legend: {
    enabled: false,
  },

  exporting: {
    enabled: false,
  },

  series: [],
};


public temperatureChart: any = {
  chart: {
    type: 'spline',
    //      animation: Highcharts.svg, // don't animate in old IE
    marginRight: 10,
    
  },

  credits: {  //to hide highcartSymbol
    enabled: false
  },
  time: {
    useUTC: false,
  },

  title: {
    text: 'Instantaneous Temperature Value',
  },

  accessibility: {
    announceNewData: {
      enabled: true,
      minAnnounceInterval: 1,
      announcementFormatter: function (allSeries, newSeries, newPoint) {
        if (newPoint) {
          console.log("Got new point"+(newPoint.x)+" "+(newPoint.y));
          return 'New point added. Value: ' + newPoint.y;
        }
        return false;
      },
    },
  },

  xAxis: {
    type: 'datetime',
    tickPixelInterval: 15,
  },

  yAxis: {
    title: {
      text: 'Temperature',
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: '#808080',
      },
    ],
  },

  tooltip: {
    headerFormat: '<b>{series.name}</b><br/>',
    pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}',
  },

  legend: {
    enabled: false,
  },

  exporting: {
    enabled: false,
  },

  series: [],
};


 public SampleChart: any = {
   chart: {
     type: 'spline',
     //      animation: Highcharts.svg, // don't animate in old IE
     marginRight: 10,
     events: {
       load: function () {
         // set up the updating of the chart each second
         var series = this.series[0];
         setInterval(function () {
           var x = new Date().getTime(), // current time
             y = Math.random();
       console.log("x axis is:"+JSON.stringify(x)+" y axis is:"+JSON.stringify(y));
             series.addPoint([x, y], true, true);
         }, 1000);
       },
     },
   },

   time: {
     useUTC: false,
   },

   title: {
     text: 'Instantaneous Voltage Value',
   },

   accessibility: {
     announceNewData: {
       enabled: true,
       minAnnounceInterval: 1,
       announcementFormatter: function (allSeries, newSeries, newPoint) {
         if (newPoint) {
           console.log("Got new point"+(newPoint.x)+" "+(newPoint.y));
           return 'New point added. Value: ' + newPoint.y;
         }
         return false;
       },
     },
   },

   xAxis: {
     type: 'datetime',
     tickPixelInterval: 15,
   },

   yAxis: {
     title: {
       text: 'Voltage',
     },
     plotLines: [
       {
         value: 0,
         width: 1,
         color: '#808080',
       },
     ],
   },

   tooltip: {
     headerFormat: '<b>{series.name}</b><br/>',
     pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}',
   },

   legend: {
     enabled: false,
   },

   exporting: {
     enabled: false,
   },

   series: [
     {
       name: 'Random data',
       data: (function () {
         // generate an array of random data
         var data = [],
           time = new Date().getTime(),
           i;

         for (i = -19; i <= 0; i += 1) {
           data.push({
             x: time + i * 1000,
             y: Math.random(),
           });
         }
       console.log("serias data is:"+JSON.stringify(data))
         return data;
       })(),
     },
   ],
 };

 
  /***********************Regular Method************************* */
  getServerTimeSeriesArray(dta: any) {
    const str = dta;
    let rtnArray = [];
    for (let i = 0; i < str.length; i++) {
      //console.log("str[i].totalFillings :"+str[i].totalFillings);
      rtnArray[i] = this.convertersService.convertOwlDatetimeToCustomDate(
        str[i].serverTime
      );
    }
    console.log('getCellNumberArray is:' + rtnArray);
    return rtnArray;
  }

  getPacketTimeSeriesArray(dta: any) {
    const str = dta;
    let rtnArray = [];
    for (let i = 0; i < str.length; i++) {
      //console.log("str[i].totalFillings :"+str[i].totalFillings);
      rtnArray[i] = this.convertersService.convertOwlDatetimeToCustomDate(
        str[i].packetDateTime
      );
    }
    console.log('getCellNumberArray is:' + rtnArray);
    //['2020','2020']
    return rtnArray;
  }

  getStringVoltageArray(dta: any) {
    const str = dta;
    let rtnArray = [];
    for (let i = 0; i < str.length; i++) {
      //console.log("str[i].totalFillings :"+str[i].totalFillings);
      rtnArray[i] = str[i].stringvoltage;
    }
    console.log('getCellNumberArray is:' + rtnArray);
    return rtnArray;
  }

  getInstantaneousCurrentArray(dta: any) {
    const str = dta;
    let rtnArray = [];
    for (let i = 0; i < str.length; i++) {
      //console.log("str[i].totalFillings :"+str[i].totalFillings);
      rtnArray[i] = str[i].instantaneousCurrent;
    }
    console.log('getCellNumberArray is:' + rtnArray);
    return rtnArray;
  }

  getAmbientTemperatureArray(dta: any) {
    const str = dta;
    let rtnArray = [];
    for (let i = 0; i < str.length; i++) {
      //console.log("str[i].totalFillings :"+str[i].totalFillings);
      rtnArray[i] = str[i].ambientTemperature;
    }
    console.log('getCellNumberArray is:' + rtnArray);
    return rtnArray;
  }
  /************************************************************** */

}
