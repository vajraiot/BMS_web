package com.bms.packetTypeParse;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.bms.model.BMSAlarmStatus;
import com.bms.utilities.Commonutility;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class BMSAlarmStatusParser {

	
	//ex:0001050A
	
	public BMSAlarmStatus parse(String strRawData)
	{
		
		
		BMSAlarmStatus _bMSAlarmStatus=new BMSAlarmStatus();
		
				 
		 _bMSAlarmStatus.setBankDischargeCycle(Commonutility.bitposition(strRawData, 1));
		 
		 _bMSAlarmStatus.setAmbientTemperatureHN(Commonutility.bitposition(strRawData, 2));
		 
		 
		 _bMSAlarmStatus.setSocLN(Commonutility.bitposition(strRawData, 3));

		 _bMSAlarmStatus.setStringVoltageLN(Commonutility.bitposition(strRawData, 8));

		 _bMSAlarmStatus.setStringVoltageHN(Commonutility.bitposition(strRawData, 9));

		 _bMSAlarmStatus.setStringCurrentHN(Commonutility.bitposition(strRawData, 10));

		 _bMSAlarmStatus.setBmsSedCommunication(Commonutility.bitposition(strRawData, 11));

		 _bMSAlarmStatus.setCellCommunication(Commonutility.bitposition(strRawData, 16));

		 _bMSAlarmStatus.setCellVoltageLN(Commonutility.bitposition(strRawData, 17));

		 _bMSAlarmStatus.setCellVoltageHN(Commonutility.bitposition(strRawData, 18));
		 
		 
		 _bMSAlarmStatus.setCellTemperatureHN(Commonutility.bitposition(strRawData, 19));
		 
		

		 
		
		return _bMSAlarmStatus;
	}
	
}
