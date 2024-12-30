package com.bms.pojo;


import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class RawdataParsedDTO {
	private Long id;
	private String rawdata;
	private String imeiNumber;
	private String packetType;
	private Integer count;
	private Date serverTime;

}
