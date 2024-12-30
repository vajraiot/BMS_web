package com.bms.packetTypeParse;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

import com.bms.model.CellTemperatureData;
import com.bms.model.CellVoltageData;
import com.bms.utilities.Commonutility;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class CellTemperatureDataParser {

	
	public List<CellTemperatureData> parse(String strRawData)
	{

		
		List<CellTemperatureData> lstCellTemperatureData=new ArrayList<CellTemperatureData>();
		
		int cellCount=strRawData.length()/4;
		
		int bytecount=0;
		for(int i=0;i<cellCount;i++)
		{		CellTemperatureData _cellTemperatureData=new CellTemperatureData();
			_cellTemperatureData.setCellNumber(i+1);
			_cellTemperatureData.setCellTemperature(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=2),strRawData))); //removed divede 100 value.
		
			System.out.println(_cellTemperatureData.toString());
			lstCellTemperatureData.add(_cellTemperatureData);
		}
		return lstCellTemperatureData;
	}
	
	
}
