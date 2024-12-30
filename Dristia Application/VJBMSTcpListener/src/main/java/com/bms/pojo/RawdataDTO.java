package com.bms.pojo;


import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class RawdataDTO {
	private Long id;
	private String rawdata;
	private String packetType;
	private Boolean isParsed;
	private Long ftmsPacketId;
	private Integer count;
	private Date serverTime;

}
