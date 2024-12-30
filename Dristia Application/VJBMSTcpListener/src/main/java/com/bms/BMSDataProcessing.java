package com.bms;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Hibernate;
import org.hibernate.dialect.identity.SybaseAnywhereIdentityColumnSupport;

import com.bms.hibernate.service.BMSAlarmStatusService;
import com.bms.hibernate.service.BatteryMonitoringDataService;
import com.bms.hibernate.service.CellTemperatureDataService;
import com.bms.hibernate.service.CellVoltageDataService;
import com.bms.hibernate.service.GeneralDataService;
import com.bms.hibernate.service.RawdataService;
import com.bms.model.BatteryMonitoringData;
import com.bms.model.CellTemperatureData;
import com.bms.model.GeneralData;
import com.bms.model.Rawdata;
import com.bms.packetTypeParse.BatteryMonitoringDataParser;
import com.bms.packetTypeParse.GeneralDataParser;
import com.bms.pojo.BatteryMonitoringDataWithLastIndex;
import com.bms.utilities.Commonutility;
import com.bms.utilities.Converters;


public class BMSDataProcessing {

	//private static Logger logger =   Logger.getLogger(BMSDataProcessing.class);
	public void packetProcess(String packet) {
		
	
		packet=packet.toUpperCase();
		Converters cnv = new Converters();		

		/********************save rawData**************************************/
		 Rawdata	rawdata=null;
		try {
			rawdata = new RawdataService().processAndsave(packet); 
		}
		catch(Exception ex)
		{
			
		}
		
		
		/**********************************************************/
		
		
		/*********************BMS Data processing*************************************/
		
		System.out.println("*******************************Parsind Started for rawData id is:"+rawdata.getId()+"*******************************");
		//BMSAlarmStatus _BMSAlarmStatus=new BMSAlarmStatusParser().parse(packet);
		GeneralData _generalData=new GeneralDataParser().parse(packet);
		if(_generalData==null) {return;}
		
		
		System.out.println("generlData parsed.");
		try {
		
		List<BatteryMonitoringData> _lstBatteryMonitoringData=new ArrayList<BatteryMonitoringData>();
		int bytecount=34;
		int deviceId;
		while(bytecount<((packet.length()/2)-10))
		{
			bytecount++;
			deviceId=  Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+= 1),packet));
		
			System.out.println(" Device id:"+deviceId);
			if((deviceId>=48)&&(deviceId<=51)) //this is added to check the if device id valid or not.
			{		
				
		
			
			BatteryMonitoringDataWithLastIndex _batteryMonitoringDataWithLastIndex=new BatteryMonitoringDataParser().parse(deviceId,bytecount, packet);
			if(_batteryMonitoringDataWithLastIndex==null)
			{
				return;
			}
			System.out.println("BatteryMonitoringDataParser parsed.");
			bytecount=_batteryMonitoringDataWithLastIndex.getLastIndex()-1; 
			
			_lstBatteryMonitoringData.add(_batteryMonitoringDataWithLastIndex.getBatteryMonitoringData());
			}
			else
			{
				System.out.println("device id out of boundries wher bytecount is:"+bytecount+" packet is:"+packet);
				System.out.println("device id out of boundries wher bytecount is:"+bytecount+" packet is:"+packet);
			}
			
			
			
		
		}
		
		_lstBatteryMonitoringData=replaceFFFFValuesWithPreviousValues(_lstBatteryMonitoringData);
		
		System.out.println("going to save to database ");
		/*-------------------Saving To database--------------------------------*/
		new GeneralDataService().save(_generalData);
		System.out.println("GeneralDataService saved in database  ");
		System.out.println("number of BatteryMonitoringData is:"+_lstBatteryMonitoringData.size());
		for(BatteryMonitoringData instBatteryMonitoringData:_lstBatteryMonitoringData)
		{
			saveCompleteBatterMonitoringData(_generalData,instBatteryMonitoringData);
		}
		/*----------------------------------------------------------------------*/
		
		System.out.println("_lstBatteryMonitoringData data Saved in database");
		new RawdataService().rawDataparseStatus(_generalData.getId(),true, rawdata);
		System.out.println("****************************************************************************************************");
		}
		catch(Exception ex)
		{
			System.out.println("---Exception is:"+ex.toString());
			System.out.println("------------------------------------------------------------------------------------------------------------");
			new RawdataService().rawDataparseStatus(null,false, rawdata);
		}
			
			
    	
    	
		
	
		/*****************************************************************************/

		
	}
	
	
	public static int saveCompleteBatterMonitoringData(GeneralData _generalData,BatteryMonitoringData _batteryMonitoringData)
	{
	
      try {		
    	  BatteryMonitoringData  _instbatteryMonitoringData	=new BatteryMonitoringDataService().save(_generalData,_batteryMonitoringData);

		new BMSAlarmStatusService().save(_instbatteryMonitoringData);

		new CellVoltageDataService().save(_instbatteryMonitoringData);
		new CellTemperatureDataService().save(_instbatteryMonitoringData);
		return 1;
      }
      catch(Exception ex)
      {
    	  System.out.println("Exception in saveCompleteBatterMonitoringData method :"+ex.toString());
     	  return 0;
      }
	}
	
	public static List<BatteryMonitoringData> replaceFFFFValuesWithPreviousValues(List<BatteryMonitoringData> _lstBatteryMonitoringData) //this is method replace present FFFF values with previous values.
	{
		try {
		//BatteryMonitoringData instPresentBatteryMonitoringData=instGeneralData.getBatteryMonitoringData().get(0);
			BatteryMonitoringData instPresentBatteryMonitoringData=_lstBatteryMonitoringData.get(0);
		
		boolean isContainsFFFF=false;
		for(int i=0;i<instPresentBatteryMonitoringData.getCellsConnectedCount();i++) //this condition to check whether ffff values exist or not in packet if doesnot exist then return withouth changes
		{
			if(instPresentBatteryMonitoringData.getCellTemperatureData().get(i).getCellTemperature()>(65000f)||(instPresentBatteryMonitoringData.getCellVoltageData().get(i).getCellVoltage()>(65f))) //here voltage is 65 because it is already devide by 1000 thats y.
			{
				isContainsFFFF=true;
				break;
			}
			else
			{
				isContainsFFFF=false;
			}
		}
		
		if(isContainsFFFF==false) //if dont have the ffff then no need to change values.
		{
			return _lstBatteryMonitoringData;
		}
		
		GeneralData previousGeneralData=new GeneralDataService().getLatestGeneralData(); //it will return the previous top 1 record order by server Time.
		Hibernate.initialize(previousGeneralData.getBatteryMonitoringData().get(0));
		BatteryMonitoringData previousBatteryMonitoringData=previousGeneralData.getBatteryMonitoringData().get(0);
		
		for(int i=0;i<instPresentBatteryMonitoringData.getCellsConnectedCount();i++)
		{
			if(instPresentBatteryMonitoringData.getCellTemperatureData().get(i).getCellTemperature()>(65000f))
			{
				float val=previousBatteryMonitoringData.getCellTemperatureData().get(i).getCellTemperature();
				instPresentBatteryMonitoringData.getCellTemperatureData().get(i).setCellTemperature(val);
			}
			
			if((instPresentBatteryMonitoringData.getCellVoltageData().get(i).getCellVoltage()>(65f)))
			{
				float val=previousBatteryMonitoringData.getCellVoltageData().get(i).getCellVoltage();
				instPresentBatteryMonitoringData.getCellVoltageData().get(i).setCellVoltage(val);
			}
			
		}
		
		return _lstBatteryMonitoringData;
		}
		catch(Exception ex)
		{
			System.out.println("exceptio in place method..."+ex.toString());
			return _lstBatteryMonitoringData;
		}
	}

}
