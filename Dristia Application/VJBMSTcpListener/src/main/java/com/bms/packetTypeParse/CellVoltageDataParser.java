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

import com.bms.model.CellVoltageData;
import com.bms.utilities.Commonutility;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class CellVoltageDataParser {
	
	public List<CellVoltageData> parse(String strRawData)
	{
		
		
		List<CellVoltageData> lstCellVoltageData=new ArrayList<CellVoltageData>();
		
		int cellCount=strRawData.length()/4;
		
		int bytecount=0;
		for(int i=0;i<cellCount;i++)
		{
			CellVoltageData _cellVoltageData=new CellVoltageData();
			_cellVoltageData.setCellNumber(i+1);
			_cellVoltageData.setCellVoltage(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=2),strRawData))/1000f);
		
			System.out.println(_cellVoltageData.toString());
			lstCellVoltageData.add(_cellVoltageData);
		}
		return lstCellVoltageData;
	}

	
	
	
}
