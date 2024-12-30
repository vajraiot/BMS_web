package com.bms.miscellaneous;

import com.bms.utilities.Converters;

public enum PacketType {
	ACTIVATION("ACTIVATION PACKET","ACTVR"),
   HEALTH("HEALTH PACKET","HCHKR"),
   DMF("DATA MESSAGE FORMAT PROTOCOL","LMP"),
   HEALTH_MONITORING("HEALTH MONITORING PROTOCOL","HMP"),
   EMERGENCY_MONITORING("EMERGENCY MONITORING PROTOCOL MESSAGE FORMAT","EPB"),
  NETWROK_RECONNECT("Network Reconnect Packet","NRP"),

  UNKNOWN("Unkwon packet","UNKNOWN");
  // UNKNOWN("Unkwon packet","undefinied");
	
   private PacketType(String _name, String _identifiers) {
	this.name=_name;
	this.identifiers=_identifiers;
	}
  
	public final String name;
	public final String identifiers;
	//public final String identifiers;
	

}
