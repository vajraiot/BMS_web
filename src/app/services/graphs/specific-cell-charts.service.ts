import { Injectable } from '@angular/core';
import {ApplicationUtilitiesService} from '../CommonUtilities/application-utilities.service';
import {SpecificCellDetails} from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SpecificCellChartsService {

  constructor(private applicationUtilitiesService:ApplicationUtilitiesService) { }


  public getHigchartOfCellVoltageData(dtaArray: SpecificCellDetails[],chartType:string): any {
    return {
      chart: {
          type: chartType
      },
      title: {
          text: 'Cell Voltage'
      },
      exporting: {
        enabled: false
      },
      credits: {  //to hide highcartSymbol
        enabled: false
      },
      xAxis: {
          categories:  this.applicationUtilitiesService.getCellPacketTimeArray(dtaArray),
          labels: {
            style: {
              color: '#000',
              font: '9px Trebuchet MS, Verdana, sans-serif'
            }
          },
          reversed: true, //it will reverse the x axis 
      },
      accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
      yAxis: {
          title: {
              text: 'Cell Voltage(V)'
          },
          labels: {
              formatter: function () {
                  return this.value + '';
              }
          }
      },
      tooltip: {
          crosshairs: true,
          shared: true
      },
      plotOptions: {
          spline: {
              marker: {
                  radius: 4,
                  lineColor: '#666666',
                  lineWidth: 1
              }
          },
          pie: {
            //allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
      },
      series: [{
        name: 'Cell Voltage(V)',
       // colorByPoint: true,
        marker: {
          symbol: 'circle'          
      },
      data:  this.applicationUtilitiesService.getCellVoltageArray(dtaArray),
      color:"#0dd417" //Nearly green color.
    }]
  };

  
  }



  public getHigchartOfTemperatureData(dtaArray: SpecificCellDetails[],chartType:string): any {
    return {
      chart: {
          type: chartType
      },
      title: {
          text: 'Cell Temperature'
      },
      exporting: {
        enabled: false
      },
      credits: {  //to hide highcartSymbol
        enabled: false
      },
      xAxis: {
          categories:  this.applicationUtilitiesService.getCellPacketTimeArray(dtaArray),
          labels: {
            style: {
              color: '#000',
              font: '9px Trebuchet MS, Verdana, sans-serif'
            }
          },
          reversed: true, //it will reverse the x axis 
      },
      accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
      yAxis: {
          title: {
              text: 'Cell Temperature(°C)'
          },
          labels: {
              formatter: function () {
                  return this.value + '';
              }
          }
      },
      tooltip: {
          crosshairs: true,
          shared: true
      },
      plotOptions: {
          spline: {
              marker: {
                  radius: 4,
                  lineColor: '#c3d408',
                  lineWidth: 1
              }
          },
          pie: {
            //allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
      },
      series: [{
        name: 'Cell Temperature(°C)',
       // colorByPoint: true,
        marker: {
          symbol: 'circle'
      },
      data:  this.applicationUtilitiesService.getCellTemperatureArray(dtaArray),
      color:"#c3d408" //orange color
    }]
  };

  
  }
}
