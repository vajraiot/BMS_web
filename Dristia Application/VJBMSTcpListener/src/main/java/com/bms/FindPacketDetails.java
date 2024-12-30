package com.bms;

import com.bms.miscellaneous.PacketType;
import com.bms.utilities.Converters;

public class FindPacketDetails {

	public PacketType findThePacketType(String packet)
	{
		PacketType rtnpacketTyp=PacketType.UNKNOWN;
		Converters cnv = new Converters();
		
		if (cnv.isDataExistInStringWith2c(packet, (PacketType.ACTIVATION.name))) {

			rtnpacketTyp=PacketType.ACTIVATION;
			
		}

		else if (cnv.isDataExistInStringWith2c(packet, (PacketType.HEALTH.identifiers))) {
			rtnpacketTyp=PacketType.HEALTH;
			
		} else if (cnv.isDataExistInStringWith2c(packet, (PacketType.DMF.identifiers))) {
			rtnpacketTyp=PacketType.DMF;
		}

		else if (cnv.isDataExistInStringWith2c(packet, (PacketType.HEALTH_MONITORING.identifiers))) {
			rtnpacketTyp=PacketType.HEALTH_MONITORING;
			
		}

		else if (cnv.isDataExistInStringWith2c(packet, (PacketType.EMERGENCY_MONITORING.identifiers))) {
			rtnpacketTyp=PacketType.EMERGENCY_MONITORING;
		
		}

		else if (cnv.isDataExistInStringWith2c(packet, (PacketType.NETWROK_RECONNECT.identifiers))) {
			rtnpacketTyp=PacketType.NETWROK_RECONNECT;
			
		} else {

			rtnpacketTyp=PacketType.UNKNOWN;
			
		}
		return rtnpacketTyp;
		
	}
}
