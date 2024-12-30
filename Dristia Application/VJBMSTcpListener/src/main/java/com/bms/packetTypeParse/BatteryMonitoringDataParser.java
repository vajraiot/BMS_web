package com.bms.packetTypeParse;

import java.io.Serializable;
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

import com.bms.model.BMSAlarmStatus;
import com.bms.model.BatteryMonitoringData;
import com.bms.model.CellTemperatureData;
import com.bms.model.CellVoltageData;
import com.bms.model.GeneralData;
import com.bms.pojo.BatteryMonitoringDataWithLastIndex;
import com.bms.utilities.Commonutility;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class BatteryMonitoringDataParser {
	
	
	//BatteryMonitoringData.java
	
	
	//GeneralData _GeneralData=new GeneralDataParser().parseData("2355502C474152424D53303030312C31363A33343A30302C31372F31322F323031392C30000B56414A5241424D53313930303133302F30332F323031380001050A2020FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000005C41F93BAD0000000000000000423BF69E41CC04F842CB4C6C00000000000015363FA156703FE14AED00000000000000000000000600000000016401520000000027882E");
	public BatteryMonitoringDataWithLastIndex parse(int deviceId,int bytecount,String strRawData)
	{
		try {
		//BatteryMonitoringDataWithLastIndex rtnBatteryMonitoringDataWithLastIndex=new BatteryMonitoringDataWithLastIndex();
		
		BatteryMonitoringData _batteryMonitoringData=new  BatteryMonitoringData() ;
		_batteryMonitoringData.setDeviceId(deviceId);
	
	_batteryMonitoringData.setBmsManufacturerID(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+= 2),strRawData)));
	
	String strSerialNumber=Commonutility.hex2ASCII(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=13),strRawData));
	if(Commonutility.isStringContainsAllZeros(strSerialNumber)||Commonutility.isStringContainsSpaces(strSerialNumber)||(!Commonutility.isStringValid(strSerialNumber)))
	{
		System.out.println("invalid SerialNumber."+strSerialNumber);
		return null;
	}
	_batteryMonitoringData.setSerialNumber(strSerialNumber);
		
	_batteryMonitoringData.setInstallationDate(Commonutility.hex2ASCII(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=10),strRawData)));
	
	String strBaknAlarmString=Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData);
	
	System.out.println("strBaknAlarmString is:"+strBaknAlarmString);
	BMSAlarmStatus _bMSAlarmStatus=new BMSAlarmStatusParser().parse(strBaknAlarmString);
	_batteryMonitoringData.setBMSAlarmStatus(_bMSAlarmStatus);
	
	
	int numberofCellConnected=Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,bytecount+=1,strRawData));
	System.out.println("numberofCellConnected is:"+numberofCellConnected);
	_batteryMonitoringData.setCellsConnectedCount(numberofCellConnected);
	
	int problemCells=Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,bytecount+=1,strRawData));
	System.out.println("numberofCellConnected is:"+problemCells);
	_batteryMonitoringData.setProblemCells(problemCells);
	
	String strCellVoltages=	Commonutility.getSubstringStartAndEndIndex(bytecount,bytecount+=(numberofCellConnected*2),strRawData);
	System.out.println("strCellVoltages is:"+strCellVoltages);
	
	List<CellVoltageData> lstCellVoltageData=new CellVoltageDataParser().parse(strCellVoltages);
	_batteryMonitoringData.setCellVoltageData(lstCellVoltageData);
	
	
	
	String strCellTemp=	Commonutility.getSubstringStartAndEndIndex(bytecount,bytecount+=(numberofCellConnected*2),strRawData);
	System.out.println("strCellTemp is:"+strCellTemp);
	
	List<CellTemperatureData> lstCellTemperatureData=new CellTemperatureDataParser().parse(strCellTemp);
	_batteryMonitoringData.setCellTemperatureData(lstCellTemperatureData);
	
	
	
	_batteryMonitoringData.setStringvoltage(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=2),strRawData))/10f);//changed 100 to 10 by suggesting the prasad sir.
	
	_batteryMonitoringData.setSystemPeakCurrentInChargeOneCycle(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=2),strRawData))/10f);
	
	
	_batteryMonitoringData.setAverageDischargingCurrent(Commonutility.hex2ieee754tofloat(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	
	_batteryMonitoringData.setAverageChargingCurrent(Commonutility.hex2ieee754tofloat(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	
	_batteryMonitoringData.setAhInForOneChargeCycle(Commonutility.hex2ieee754tofloat(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	
	_batteryMonitoringData.setAhOutForOneDischargeCycle(Commonutility.hex2ieee754tofloat(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	
	
	_batteryMonitoringData.setCumulativeAHIn(Commonutility.hex2ieee754tofloat(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	_batteryMonitoringData.setCumulativeAHOut(Commonutility.hex2ieee754tofloat(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	
	_batteryMonitoringData.setChargeTimeCycle(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	_batteryMonitoringData.setDischargeTimeCycle(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	
	
	
	_batteryMonitoringData.setTotalChargingEnergy(Commonutility.hex2ieee754tofloat(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	_batteryMonitoringData.setTotalDischargingEnergy(Commonutility.hex2ieee754tofloat(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	
	_batteryMonitoringData.setEveryHourAvgTemp(Commonutility.hex2ieee754tofloat(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	
	_batteryMonitoringData.setCumulativeTotalAvgTempEveryHour(Commonutility.hex2ieee754tofloat(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	
	
	
	_batteryMonitoringData.setChargeOrDischargeCycle(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	_batteryMonitoringData.setSocLatestValueForEveryCycle(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=2),strRawData))/100f);

	
	_batteryMonitoringData.setDodLatestValueForEveryCycle(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=2),strRawData))/100f);
	
	_batteryMonitoringData.setSystemPeakCurrentInDischargeOneCycle(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=2),strRawData))/10f);
	
	
	_batteryMonitoringData.setInstantaneousCurrent(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=2),strRawData))/10f);
	
	
	_batteryMonitoringData.setAmbientTemperature(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=2),strRawData))/100f); //changed 4 - 2 and added divide by 100  
	
	
	_batteryMonitoringData.setBatteryRunHours(Commonutility.hex2decimal(Commonutility.getSubstringStartAndEndIndex(bytecount,(bytecount+=4),strRawData)));
	
	
	
	BatteryMonitoringDataWithLastIndex _rtnbatteryMonitoringDataWithLastIndex=BatteryMonitoringDataWithLastIndex.builder()
			.batteryMonitoringData(_batteryMonitoringData)
			.lastIndex(bytecount)
			.build();
			
	return _rtnbatteryMonitoringDataWithLastIndex;
	    }
	catch(Exception ex)
		{
		 return null;
		}
 }
}

/*2355502C474152424D53303030312C31363A33343A30302C31372F31322F323031392C30000B56414A5241424D53313930303133302F30332F323031380001050A2020FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000005C41F93BAD0000000000000000423BF69E41CC04F842CB4C6C00000000000015363FA156703FE14AED00000000000000000000000600000000016401520000000027882E
 * 
 * 0) 23
1) 55
2) 50
3) 2C
4) 47
5) 41
6) 52
7) 42
8) 4D
9) 53
10) 30
11) 30
12) 30
13) 31
14) 2C
15) 31
16) 36
17) 3A
18) 33
19) 34
20) 3A
21) 30
22) 30
23) 2C
24) 31
25) 37
26) 2F
27) 31
28) 32
29) 2F
30) 32
31) 30
32) 31
33) 39
34) 2C
35) 30
36) 00
37) 0B
38) 56
39) 41
40) 4A
41) 52
42) 41
43) 42
44) 4D
45) 53
46) 31
47) 39
48) 30
49) 30
50) 31
51) 33
52) 30
53) 2F
54) 30
55) 33
56) 2F
57) 32
58) 30
59) 31
60) 38
61) 00
62) 01
63) 05
64) 0A
65) 20
66) 20
67) FF
68) FF
69) FF
70) FF
71) FF
72) FF
73) FF
74) FF
75) FF
76) FF
77) FF
78) FF
79) FF
80) FF
81) FF
82) FF
83) FF
84) FF
85) FF
86) FF
87) FF
88) FF
89) FF
90) FF
91) FF
92) FF
93) FF
94) FF
95) FF
96) FF
97) FF
98) FF
99) FF
100) FF
101) FF
102) FF
103) FF
104) FF
105) FF
106) FF
107) FF
108) FF
109) FF
110) FF
111) FF
112) FF
113) FF
114) FF
115) FF
116) FF
117) FF
118) FF
119) FF
120) FF
121) FF
122) FF
123) FF
124) FF
125) FF
126) FF
127) FF
128) FF
129) FF
130) FF
131) FF
132) FF
133) FF
134) FF
135) FF
136) FF
137) FF
138) FF
139) FF
140) FF
141) FF
142) FF
143) FF
144) FF
145) FF
146) FF
147) FF
148) FF
149) FF
150) FF
151) FF
152) FF
153) FF
154) FF
155) FF
156) FF
157) FF
158) FF
159) FF
160) FF
161) FF
162) FF
163) FF
164) FF
165) FF
166) FF
167) FF
168) FF
169) FF
170) FF
171) FF
172) FF
173) FF
174) FF
175) FF
176) FF
177) FF
178) FF
179) FF
180) FF
181) FF
182) FF
183) FF
184) FF
185) FF
186) FF
187) FF
188) FF
189) FF
190) FF
191) FF
192) FF
193) FF
194) FF
195) 00
196) 00
197) 00
198) 5C
199) 41
200) F9
201) 3B
202) AD
203) 00
204) 00
205) 00
206) 00
207) 00
208) 00
209) 00
210) 00
211) 42
212) 3B
213) F6
214) 9E
215) 41
216) CC
217) 04
218) F8
219) 42
220) CB
221) 4C
222) 6C
223) 00
224) 00
225) 00
226) 00
227) 00
228) 00
229) 15
230) 36
231) 3F
232) A1
233) 56
234) 70
235) 3F
236) E1
237) 4A
238) ED
239) 00
240) 00
241) 00
242) 00
243) 00
244) 00
245) 00
246) 00
247) 00
248) 00
249) 00
250) 06
251) 00
252) 00
253) 00
254) 00
255) 01
256) 64
257) 01
258) 52
259) 00
260) 00
261) 00
262) 00
263) 27
264) 88
265) 2E

 */
 