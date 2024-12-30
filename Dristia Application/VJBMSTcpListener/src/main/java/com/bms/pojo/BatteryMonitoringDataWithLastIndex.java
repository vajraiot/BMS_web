package com.bms.pojo;


import java.util.Date;

import com.bms.model.BatteryMonitoringData;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class BatteryMonitoringDataWithLastIndex {

	private BatteryMonitoringData batteryMonitoringData;
	private int lastIndex;
	

}
