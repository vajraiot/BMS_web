package com.bms.model;

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



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="cell_voltage_data", schema = "smartbms")
//@Table(name="cell_voltage_data")
public class CellVoltageData {

	private static final long serialVersionUID = -1259518737699450692L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cell_voltage_data_id")
	private Long id;
	
	
	
	@Column(name="cell_number",  nullable=true)
	private int cellNumber;
	
	
	@Column(name="cell_voltage",  nullable=true)
	private float cellVoltage;
	
	
	/*@Column(name="batteryMonitoring_data_id",  nullable=true)
	private Long batteryMonitoringDataId;*/
	
	@ManyToOne()
	@JoinColumn(name="battery_monitoring_data_id", nullable=false)
	
	private BatteryMonitoringData batteryMonitoringData;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="server_time", nullable = true, insertable = true, updatable = false)
	private Date serverTime;
	
	
	@PrePersist
	  protected void onInsert() {
		serverTime = new Date();
	  }


	@Override
	public String toString() {
		return "CellVoltageData [id=" + id + ", cellNumber=" + cellNumber + ", cellVoltage=" + cellVoltage
				+ ", batteryMonitoringData=" + batteryMonitoringData + ", serverTime=" + serverTime + "]";
	}


	

	
	
	
}
