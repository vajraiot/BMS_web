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

import com.bms.model.GeneralData;
import com.bms.utilities.Commonutility;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class GeneralDataParser {
	
	public GeneralData parse(String strRawData)
	{
		GeneralData rtnGeneralData=null;
		
		String strDate=Commonutility.hex2ASCII(Commonutility.getSubstringbytes(24,10,strRawData));
		String strTime=Commonutility.hex2ASCII(Commonutility.getSubstringbytes(15,8,strRawData));
		Date dateTime=Commonutility.convertBMSDateTimeToDate(strDate, strTime);
		
		if(dateTime==null)
		{
			System.out.println("Error!DateTime Error "+dateTime);
		return null;
		}
		
		int byteNumber=0;
		rtnGeneralData=GeneralData.builder()
		.startPacket(Commonutility.hex2ASCII(Commonutility.getSubstringbytes(0,1,strRawData)))
		.protocalVersion(Commonutility.hex2ASCII(Commonutility.getSubstringbytes(1,1,strRawData)))
		.dataIdentifier(Commonutility.hex2ASCII(Commonutility.getSubstringbytes(2,1,strRawData)))
		
		.siteId(Commonutility.hex2ASCII(Commonutility.getSubstringbytes(4,10,strRawData)))
		.time(strTime)
		.date(strDate)
		.packetDateTime(dateTime)
		.build();
	
		return rtnGeneralData;
				
	}

	
	
	
}
