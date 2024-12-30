import { Injectable } from '@angular/core';
import {AllSitesAlarms, GeneralData} from '../../interfaces';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AllAlarmsService {
  constructor() {}

  /*****************HighCharts*********** */
  getBankCycleDCChart(dta: GeneralData[]): any {
    return this.bankCycleDCChart(dta);
  }

  getAmbientTemperatureHN (dta: GeneralData[]): any 
  {
    return this.ambientTemperatureHNChart(dta);
  
  }
  
  getSocLN (dta: GeneralData[]): any 
  {
    return this.socLNChart(dta);
  
  }


  
  getStringVoltageLHN (dta: GeneralData[]): any 
  {
    return this.stringVoltageChart(dta);
  
  }

  getStringCurrentHN (dta: GeneralData[]): any 
  {
    return this.stringCurrentHNChart(dta);
  
  }


  
  getBmsSedCommunicationFD(dta: GeneralData[]): any 
  {
    return this.bmsSedCommunicationFDChart(dta);
  
  }


  
  getCellCommunicationFD(dta: GeneralData[]): any 
  {
    return this.cellCommunicationFDChart(dta);
  
  }


  
  getCellVoltageLHN(dta: GeneralData[]): any 
  {
    return this.cellVoltageLHNChart (dta);
  
  }


  
  getCellTemperatureHN(dta: GeneralData[]): any 
  {
    return this.cellTemperatureHNChart(dta);
  
  }
  /************************************* */
  /*********************Charts******************************* */
  
  private bankCycleDCChart(generalDataArray: GeneralData[]) {
  return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      credits: {  //to hide highcartSymbol
        enabled: false
      },

      title: {
        text: 'BankCycle',
      },
      tooltip: {
       //  // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
       pointFormat: '{series.name}: <b>{point.y}</b> <br><b>{point.percentage:.1f}%</b>',
      
      },
      accessibility: {
        point: {
         valueSuffix: '%',
       
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
           // format: '<b>{point.name}</br>: {point.percentage:.1f} %',
           format: '<b>{point.name}</b>: {y} ',
          },
        },
      },
      series: [
        {
          name: 'BankCycle',
          colorByPoint: true,
          data: [
            {
              name: 'DisCharging',
              y: generalDataArray.filter(gndData=>{
              try{
                if(gndData.deviceData[0].bmsalarms.bankCycleDC==true)
                {return true}
              }catch (error) {return false;  }
              }).length  
              
            },
            {
              name: 'Charging',
              y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.bankCycleDC==false).length  
            },
          ],
        },
      ],
    };
  }



  private ambientTemperatureHNChart(generalDataArray: GeneralData[]) {
    return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        credits: {  //to hide highcartSymbol
          enabled: false
        },
        title: {
          text: 'AmbientTemperature',
        },
        tooltip: {
           // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
       pointFormat: '{series.name}: <b>{point.y}</b> <br><b>{point.percentage:.1f}%</b>',
      
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              //format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              
           format: '<b>{point.name}</b>: {y} ',
            },
          },
        },
        series: [
          {
            name: 'AmbientTemperature',
            colorByPoint: true,
            data: [
              {
                name: 'High',
                y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.ambientTemperatureHN==true).length  ,
                
              },
              {
                name: 'Normal',
                y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.ambientTemperatureHN==false).length  ,
              },
            ],
          },
        ],
      };
    }





    
  private socLNChart(generalDataArray: GeneralData[]) {
    return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },

        credits: {  //to hide highcartSymbol
          enabled: false
        },
        title: {
          text: 'state of charge(soc)',
        },
        tooltip: {
           // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
       pointFormat: '{series.name}: <b>{point.y}</b> <br><b>{point.percentage:.1f}%</b>',
      
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,              
           // format: '<b>{point.name}</br>: {point.percentage:.1f} %',
           format: '<b>{point.name}</b>: {y} ',
            },
          },
        },
        series: [
          {
            name: 'SOC',
            colorByPoint: true,
            data: [
              {
                name: 'Low',
                y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.socLN==true).length  
                
              },
              {
                name: 'Normal',
                y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.socLN==false).length  
              },
            ],
          },
        ],
      };
    }





    private stringVoltageChart(generalDataArray: GeneralData[]) {
      return {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
          },
          credits: {  //to hide highcartSymbol
            enabled: false
          },

          title: {
            text: 'string Voltage',
          },
          tooltip: {
             // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
       pointFormat: '{series.name}: <b>{point.y}</b> <br><b>{point.percentage:.1f}%</b>',
      
          },
          accessibility: {
            point: {
              valueSuffix: '%',
            },
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                //format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                format: '<b>{point.name}</b>: {y} ',
              },
            },
          },
          series: [
            {
              name: 'StringVoltage',
              colorByPoint: true,
              data: [
                {
                  name: 'Low',
                  y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.stringVoltageLHN==0).length  
                   },
                {
                  name: 'Normal',
                  y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.stringVoltageLHN==1).length  
                },
                {
                  name: 'High',
                  y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.stringVoltageLHN==2).length  
                }
              ],
            },
          ],
        };
      }




      private stringCurrentHNChart(generalDataArray: GeneralData[]) {
        return {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
            },
            credits: {  //to hide highcartSymbol
              enabled: false
            },

            title: {
              text: 'String CurrentHN',
            },
            tooltip: {
               // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
       pointFormat: '{series.name}: <b>{point.y}</b> <br><b>{point.percentage:.1f}%</b>',
      
            },
            accessibility: {
              point: {
                valueSuffix: '%',
              },
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  //format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  format: '<b>{point.name}</b>: {y} ',
                },
              },
            },
            series: [
              {
                name: 'stringCurrentHN',
                colorByPoint: true,
                data: [
                  {
                    name: 'high',
                    y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.stringCurrentHN=true).length  ,
                    
                  },
                  {
                    name: 'Normal',
                    y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.stringCurrentHN=false).length  ,
                  }
                ],
              },
            ],
          };
        }



        
      private bmsSedCommunicationFDChart(generalDataArray: GeneralData[]) {
        return {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
            },
            credits: {  //to hide highcartSymbol
              enabled: false
            },

            title: {
              text: 'Sed Communication',
            },
            tooltip: {
               // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
       pointFormat: '{series.name}: <b>{point.y}</b> <br><b>{point.percentage:.1f}%</b>',
      
            },
            accessibility: {
              point: {
                valueSuffix: '%',
              },
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  //format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  format: '<b>{point.name}</b>: {y} ',
                },
              },
            },
            series: [
              {
                name: 'Sed Communication',
                colorByPoint: true,
                data: [
                  {
                    name: 'Fail',
                    y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.bmsSedCommunicationFD==true).length  
                    
                  },
                  {
                    name: 'Default',
                    y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.bmsSedCommunicationFD==false).length  
                  }
                ],
              },
            ],
          };
        }



        
        
      private cellCommunicationFDChart(generalDataArray: GeneralData[]) {
        return {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
            },

            credits: {  //to hide highcartSymbol
              enabled: false
            },

            title: {
              text: 'Cell CommunicationFD',
            },
            tooltip: {
               // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
       pointFormat: '{series.name}: <b>{point.y}</b> <br><b>{point.percentage:.1f}%</b>',
      
            },
            accessibility: {
              point: {
                valueSuffix: '%',
              },
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                //  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                format: '<b>{point.name}</b>: {y} ',
                },
              },
            },
            series: [
              {
                name: 'Cell CommunicationFD',
                colorByPoint: true,
                data: [
                  {
                    name: 'Fail',
                    y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.cellCommunicationFD==true).length, 
                    
                  },
                  {
                    name: 'Default',
                    y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.cellCommunicationFD==false).length,
                    
                  }
                ],
              },
            ],
          };
        }


        

        
        
      private cellVoltageLHNChart(generalDataArray: GeneralData[]) {
        return {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
            },

            credits: {  //to hide highcartSymbol
              enabled: false
            },

            title: {
              text: 'Cell Voltage',
            },
            tooltip: {
               // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
       pointFormat: '{series.name}: <b>{point.y}</b> <br><b>{point.percentage:.1f}%</b>',
      
            },
            accessibility: {
              point: {
                valueSuffix: '%',
              },
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                //  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                format: '<b>{point.name}</b>: {y} ',
                },
              },
            },
            series: [
              {
                name: 'Cell Voltage',
                colorByPoint: true,
                data: [
                  {
                    name: 'Low',
                    y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.cellVoltageLHN==0).length , 
                    
                  },
                  {
                    name: 'Normal',
                    y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.cellVoltageLHN==1).length , 
                  },
                  {
                    name: 'High',
                    y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.cellVoltageLHN==2).length , 
                  },
                ],
              },
            ],
          };
        }

        
        
        
      private cellTemperatureHNChart(generalDataArray: GeneralData[]) {
        return {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
            },
            credits: {  //to hide highcartSymbol
              enabled: false
            },
            title: {
              text: 'Cell Temperature',
            },
            tooltip: {
               // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
       pointFormat: '{series.name}: <b>{point.y}</b> <br><b>{point.percentage:.1f}%</b>',
      
            },
            accessibility: {
              point: {
                valueSuffix: '%',
              },
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  //format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  format: '<b>{point.name}</b>: {y} ',
                },
              },
            },
            series: [
              {
                name: 'Cell Temperature',
                colorByPoint: true,
                data: [
                  {
                    name: 'High',
                    y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.cellTemperatureHN==true).length,  
                    
                  },
                  {
                    name: 'Normal',
                    y: generalDataArray.filter(gndData=>gndData.deviceData[0].bmsalarms.cellTemperatureHN==false).length , 
                  },
                  
                ],
              },
            ],
          };
        }

        
  /**************************************************** */
}
