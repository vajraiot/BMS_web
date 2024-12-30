package com.bms;


import com.bms.hibernate.service.BMSAlarmStatusService;
import com.bms.hibernate.service.BatteryMonitoringDataService;
import com.bms.hibernate.service.CellTemperatureDataService;
import com.bms.hibernate.service.CellVoltageDataService;
import com.bms.hibernate.service.GeneralDataService;
import com.bms.hibernate.service.RawdataParsedService;
import com.bms.hibernate.service.RawdataService;
import com.bms.miscellaneous.PacketType;
import com.bms.model.BMSAlarmStatus;
import com.bms.model.BatteryMonitoringData;
import com.bms.model.GeneralData;
import com.bms.model.Rawdata;
import com.bms.packetTypeParse.BMSAlarmStatusParser;
import com.bms.packetTypeParse.BatteryMonitoringDataParser;
import com.bms.packetTypeParse.GeneralDataParser;
import com.bms.pojo.BatteryMonitoringDataWithLastIndex;
import com.bms.utilities.Commonutility;
import com.bms.utilities.Converters;

public class RawDataProcessing {

	
	public static void packetProcess(String packet) {

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
		
		//BMSAlarmStatus _BMSAlarmStatus=new BMSAlarmStatusParser().parse(packet);
		GeneralData _generalData=new GeneralDataParser().parse(packet);
		
		new GeneralDataService().save(_generalData);
		
		
		int bytecount=36;
		int deviceId=Commonutility.hex2decimal(Commonutility.getSubstringbytes(34,1,packet));
		//while(bytecount<(packet.length()/2))
		//{
			BatteryMonitoringDataWithLastIndex _batteryMonitoringDataWithLastIndex=new BatteryMonitoringDataParser().parse(deviceId,bytecount, packet);
		//	bytecount
		
		//}
			
			saveCompleteBatterMonitoringData(_generalData,_batteryMonitoringDataWithLastIndex.getBatteryMonitoringData());
			
			
    	
    	
		
	
		/*****************************************************************************/

		
	}
	
	
	public static int saveCompleteBatterMonitoringData(GeneralData _generalData,BatteryMonitoringData _batteryMonitoringData)
	{
	
		
		new BatteryMonitoringDataService().save(_generalData,_batteryMonitoringData);

		new BMSAlarmStatusService().save(_batteryMonitoringData);

		new CellVoltageDataService().save(_batteryMonitoringData);
		new CellTemperatureDataService().save(_batteryMonitoringData);
		return 0;
	}
	
	
	

}
