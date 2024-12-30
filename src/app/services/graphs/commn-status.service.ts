import { Injectable } from '@angular/core';
import { reduce } from 'highcharts';
import { GeneralData, CommnStatus } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommnStatusService {

  constructor() { }

public getHighchartCommnStatus(commnStatus:CommnStatus[]): any
{
  return this.commnChart3D(commnStatus);
}




public getBmsStatusChart(generalDataArray: GeneralData[]): any
{
  return this.bmsStatusChart3D(generalDataArray);
}



   
  private commnChart(dta: CommnStatus[]) {
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
          text: '',
        },
        exporting: {
          enabled: false
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
            point:{
              events:{
               
              }
            }
          },
     
        },
        series: [
          {
            name: 'Commn Status',
            colorByPoint: true,
            data: [
              {
                name: 'Communicating',
                y:dta.filter(fdta=>fdta.statusType==1).length,
                color: '#00e64d', //green color
              },
              {
                name: 'Not Communicating',
                y:dta.filter(fdta=>fdta.statusType==0).length,
                color: '#e93929', //green color
              },
            ],
          },
        ],
      };
    }

     
  private commnChart3D(dta: CommnStatus[]) {
    return {
        chart: {
       
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
        },
        credits: {  //to hide highcartSymbol
          enabled: false
        },
  
        title: {
          text: '',
        },
        exporting: {
          enabled: false
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
            size:'50%',
            height: '100%',
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
              enabled: true,
             // format: '<b>{point.name}</br>: {point.percentage:.1f} %',
             format: '<b>{point.name}</b>: {y} ',
            },
            point:{
              events:{
               
              }
            }
          },
     
        },
        series: [
          {
            name: 'Commn Status',
            colorByPoint: true,
            data: [
              {
                name: 'Communicating',
                y:dta.filter(fdta=>fdta.statusType==1).length,
                color: '#00e64d', //green color
              },
              {
                name: 'Not Communicating',
                y:dta.filter(fdta=>fdta.statusType==0).length,
                color: '#e93929', //green color
              },
            ],
          },
        ],
      };
    }



    


    
  private bmsStatusChart(generalDataArray: GeneralData[]) {
    return {
      chart: {
        
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
          type: 'pie',
          /*options3d: {
              enabled: true,
              alpha: 45,
              beta: 0
          }*/
      },
      title: {
          text: ''
      },
      exporting: {
        enabled: false
      },
      credits: {  //to hide highcartSymbol
        enabled: false
      },
      plotOptions: {

          /*pie: {
              innerSize: 100,
              depth: 35,
              point:{
                events:{
                  
                }
              }
          },*/
          point:{
            events:{
             
            }
          }

      },
      series: [{
        name: 'Commn Status',
        colorByPoint: true,
        data: [
          {
            name: 'String Volt High',
            y:generalDataArray.filter(gndArray=>
              {
                try{
                  if(gndArray.deviceData[0].bmsalarms.stringVoltageLHN==2)
                  {return true}
                }catch (error) {return false;  }}
                ).length,
            color: '#FF00FF', 
          },

          {
            name: 'String Voltage Low',
            y:generalDataArray.filter(gndArray=>
              {
                try{
                  if(gndArray.deviceData[0].bmsalarms.stringVoltageLHN==0)
                  {return true}
                }catch (error) {return false;  }}
                ).length,
            color: '#483D8B', 
          },
          
        /*  {
            name: 'Cell Voltage High',
            y:generalDataArray.filter(gndArray=>
              {
                try{
                  if(gndArray.deviceData[0].bmsalarms.cellVoltageLHN==2)
                  {return true}
                }catch (error) {return false;  }}
                
              ).length,
            color: '#800000', 
          },          
          {
            name: 'Cell Voltage Low',
            y:generalDataArray.filter(gndArray=>
              {
                try{
                  if(gndArray.deviceData[0].bmsalarms.cellVoltageLHN==0)
                  {return true}
                }catch (error) {return false;  }}
              
                ).length,
            color: '#4682B4', 
          },*/
          {
            name: 'SOC Low',
            y:generalDataArray.filter(gndArray=>
             { try{
                if(gndArray.deviceData[0].bmsalarms.socLN==true)
                {return true}
              }catch (error) {return false;  }}
            
              ).length,
            color: '#FA8072', 
          },

        /*  {
            name: 'Cell Temperature High',
            y:generalDataArray.filter(gndArray=>
              { try{
                if(gndArray.deviceData[0].bmsalarms.cellTemperatureHN==true)
                {return true}
              }catch (error) {return false;  }}
            
              ).length,
            color: '#F4A460', 
          },*/


          {
            name: 'BMS Communicating ',
            y:generalDataArray.filter(gndArray=>
              { try{
                if(gndArray.deviceData[0].bmsalarms.bmsSedCommunicationFD==false)
                {return true}
              }catch (error) {return false;  }}
            
              ).length,
            color: '#006440', 
          },

          
          {
            name: 'BMS Not Communicating ',
            y:generalDataArray.filter(gndArray=>
              { try{
                if(gndArray.deviceData[0].bmsalarms.bmsSedCommunicationFD==true)
                {return true}
              }catch (error) {return false;  }}
            
              ).length,
            color: '#8B0000', 
          },


          {
            name: 'Ambient Temperature High ',
            y:generalDataArray.filter(gndArray=>
              { try{
                if(gndArray.deviceData[0].bmsalarms.ambientTemperatureHN==true)
                {return true}
              }catch (error) {return false;  }}
            
              ).length,
            color: '#000080', 
          },


          
          {
            name: 'String current High ',
            y:generalDataArray.filter(gndArray=>
              { try{
                if(gndArray.deviceData[0].bmsalarms.stringCurrentHN==true)
                {return true}
              }catch (error) {return false;  }}
            
              ).length,
            color: '#8B008B', 
          },


        ]
      }]
  };
    }


    
  private bmsStatusChart3D(generalDataArray: GeneralData[]) {
    return {
      chart: {
        
        plotShadow: false,
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
      },
      title: {
          text: ''
      },
      exporting: {
        enabled: false
      },
      credits: {  //to hide highcartSymbol
        enabled: false
      },
      plotOptions: {
        pie: {
          size:'50%',
          height: '50%',
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
           // format: '<b>{point.name}</br>: {point.percentage:.1f} %',
           format: '<b>{point.name}</b>: {y} ',
          },
          point:{
            events:{
             
            }
          }
        },
         
      },
      series: [{
        name: 'Commn Status',
        colorByPoint: true,
        data: [
          {
            name: 'String Volt High',
            y:generalDataArray.filter(gndArray=>
              {
                try{
                  if(gndArray.deviceData[0].bmsalarms.stringVoltageLHN==2)
                  {return true}
                }catch (error) {return false;  }}
                ).length,
            color: '#FF00FF', 
          },

          {
            name: 'String Voltage Low',
            y:generalDataArray.filter(gndArray=>
              {
                try{
                  if(gndArray.deviceData[0].bmsalarms.stringVoltageLHN==0)
                  {return true}
                }catch (error) {return false;  }}
                ).length,
            color: '#483D8B', 
          },
          
        /*  {
            name: 'Cell Voltage High',
            y:generalDataArray.filter(gndArray=>
              {
                try{
                  if(gndArray.deviceData[0].bmsalarms.cellVoltageLHN==2)
                  {return true}
                }catch (error) {return false;  }}
                
              ).length,
            color: '#800000', 
          },          
          {
            name: 'Cell Voltage Low',
            y:generalDataArray.filter(gndArray=>
              {
                try{
                  if(gndArray.deviceData[0].bmsalarms.cellVoltageLHN==0)
                  {return true}
                }catch (error) {return false;  }}
              
                ).length,
            color: '#4682B4', 
          },*/
          {
            name: 'SOC Low',
            y:generalDataArray.filter(gndArray=>
             { try{
                if(gndArray.deviceData[0].bmsalarms.socLN==true)
                {return true}
              }catch (error) {return false;  }}
            
              ).length,
            color: '#FA8072', 
          },

        /*  {
            name: 'Cell Temperature High',
            y:generalDataArray.filter(gndArray=>
              { try{
                if(gndArray.deviceData[0].bmsalarms.cellTemperatureHN==true)
                {return true}
              }catch (error) {return false;  }}
            
              ).length,
            color: '#F4A460', 
          },*/


          {
            name: 'BMS Communicating ',
            y:generalDataArray.filter(gndArray=>
              { try{
                if(gndArray.deviceData[0].bmsalarms.bmsSedCommunicationFD==false)
                {return true}
              }catch (error) {return false;  }}
            
              ).length,
            color: '#006440', 
          },

          
          {
            name: 'BMS Not Communicating ',
            y:generalDataArray.filter(gndArray=>
              { try{
                if(gndArray.deviceData[0].bmsalarms.bmsSedCommunicationFD==true)
                {return true}
              }catch (error) {return false;  }}
            
              ).length,
            color: '#8B0000', 
          },


          {
            name: 'Ambient Temperature High ',
            y:generalDataArray.filter(gndArray=>
              { try{
                if(gndArray.deviceData[0].bmsalarms.ambientTemperatureHN==true)
                {return true}
              }catch (error) {return false;  }}
            
              ).length,
            color: '#000080', 
          },


          
          {
            name: 'String current High ',
            y:generalDataArray.filter(gndArray=>
              { try{
                if(gndArray.deviceData[0].bmsalarms.stringCurrentHN==true)
                {return true}
              }catch (error) {return false;  }}
            
              ).length,
            color: '#8B008B', 
          },


        ]
      }]
  };
    }
}
