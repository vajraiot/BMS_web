package com.bms.hibernate.service;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bms.hibernate.util.HibernateUtil;
import com.bms.miscellaneous.PacketType;
import com.bms.model.Rawdata;
import com.bms.model.RawdataParsed;
import com.bms.pojo.RawdataDTO;
import com.bms.pojo.RawdataParsedDTO;


public class RawdataParsedService {
	
	
	public void saveParsedData(String hexRawPacket,PacketType pktype)
	{
		if(pktype.identifiers.equals(PacketType.UNKNOWN.identifiers))
		{
			System.out.println("unkonw pakcet founded.");
			RawdataParsedDTO rawdataParsedDTO=RawdataParsedDTO.builder()
					.rawdata(hexRawPacket)
					.count(hexRawPacket.length())
					.imeiNumber("testing")
					.packetType(pktype.name)
					 .build();
			
			save(rawdataParsedDTO);
			
		}
		else
		{
			
			RawdataParsedDTO rawdataParsedDTO=RawdataParsedDTO.builder()
					.rawdata(hexRawPacket)
					.count(hexRawPacket.length())
					.imeiNumber("testing")
					.packetType(pktype.name)
					 .build();
			
			save(rawdataParsedDTO);
					
		}
		
	}

	public void save(RawdataParsedDTO rawdataParsedDTO) {

		Transaction transaction = null;
		try (Session session = HibernateUtil.getSessionFactory().openSession()) {
			// start a transaction
			transaction = session.beginTransaction();

			RawdataParsed rawdataParsed = RawdataParsed.builder().rawdata(rawdataParsedDTO.getRawdata())
					.imeiNumber(rawdataParsedDTO.getImeiNumber()).packetType(rawdataParsedDTO.getPacketType())
					.count(rawdataParsedDTO.getCount())

					.build();

			// save the student object
			session.save(rawdataParsed);
			// commit transaction
			transaction.commit();
		} catch (Exception e) {
			if (transaction != null) {
				transaction.rollback();
			}
			e.printStackTrace();
		}
	}
}
