package com.bms.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

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
@Table(name="general_data", schema = "smartbms")
//@Table(name="general_data")
public class GeneralData implements Serializable {

	//private static final long serialVersionUID = -1259518737699450692L;
	
	private static final long serialVersionUID = -558553967080513790L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "general_data_id")
	private Long id;
	
	
	
	@Column(name="start_packet", nullable=true)
	private String startPacket;
	
	@Column(name="protocal_version",  nullable=true)
	private String protocalVersion;
	
	@Column(name="data_identifier",  nullable=true)
	private String dataIdentifier;
	
	@Column(name="site_id",  nullable=true)
	private String siteId;
	
		
	@Column(name="time",  nullable=true)
	private String time;
	
	@Column(name="date",  nullable=true)
	private String date;
	
	@Column(name="packet_date_time",  nullable=true)
	private Date packetDateTime;
	
	
//	@OneToMany(fetch=FetchType.EAGER, targetEntity=BatteryMonitoringData.class, cascade=CascadeType.ALL)
//	@JoinColumn(name = "general_data_id", referencedColumnName="general_data_id")
//	private List<BatteryMonitoringData> batteryMonitoringData;

	@OneToMany(mappedBy = "generalData", fetch = FetchType.EAGER)
	@Fetch(value = FetchMode.SUBSELECT)
	private List<BatteryMonitoringData> batteryMonitoringData;

	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="server_time", nullable = true, insertable = true, updatable = false)
	private Date serverTime;
	
	
	
	@PrePersist
	  protected void onInsert() {
		serverTime = new Date();
	  }



	@Override
	public String toString() {
		return "GeneralData [id=" + id + ", startPacket=" + startPacket + ", protocalVersion=" + protocalVersion
				+ ", dataIdentifier=" + dataIdentifier + ", siteId=" + siteId + ", time=" + time + ", date=" + date
				+ ", packetDateTime=" + packetDateTime + ", serverTime=" + serverTime + "]";
	}
	
	
	
	
	
	//sample packe:ACTVR,101010,OTSI,FV1.03,353635080699933,12,000000.0000,N,0000000.0000,E,0,000000000000,000.00,00.0,31,404,49,4F2F,1,0,0.100,019034,02
}
