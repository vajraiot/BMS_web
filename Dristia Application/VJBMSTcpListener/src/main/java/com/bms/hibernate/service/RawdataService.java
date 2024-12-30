package com.bms.hibernate.service;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bms.FindPacketDetails;
import com.bms.RawDataProcessing;
import com.bms.hibernate.util.HibernateUtil;
import com.bms.miscellaneous.PacketType;
import com.bms.model.Rawdata;
import com.bms.pojo.RawdataDTO;


public class RawdataService {
	
	
	public Rawdata processAndsave(String HexRawData)
	{
		
	PacketType packetType	 = new FindPacketDetails().findThePacketType(HexRawData);
		
	 RawdataDTO rawdataDTO=RawdataDTO.builder()
				.rawdata(HexRawData)
				.packetType(packetType.identifiers)
				.ftmsPacketId(null)
				.isParsed(false)
				.count(HexRawData.length())
				.build();
		
	 Rawdata rawdata=save(rawdataDTO);
	 return rawdata;
	}
		public Rawdata save(RawdataDTO rawdataDTO) {

			Transaction transaction = null;
			Rawdata rawdata=null;
			try (Session session = HibernateUtil.getSessionFactory().openSession()) {
				// start a transaction
				transaction = session.beginTransaction();

				rawdata = Rawdata.builder()
											.rawdata(rawdataDTO.getRawdata())
											 .generalDataId(null)
											.isParsed(rawdataDTO.getIsParsed())
											.dataSize(rawdataDTO.getCount())
											.build();

				// save the student object
				session.save(rawdata);
				// commit transaction
				transaction.commit();
			} catch (Exception e) {
				if (transaction != null) {
					transaction.rollback();
				}
				e.printStackTrace();
			}
			finally{
				return rawdata;
			}
			
		}
		
		public void parsedOk(Rawdata rawdata)
		{
			if(rawdata.getId()==null)
			{
				return;
			}
			Transaction transaction = null;
			
			try (Session session = HibernateUtil.getSessionFactory().openSession()) {
				// start a transaction
				transaction = session.beginTransaction();

				
				rawdata.setParsed(true);
				// save the student object
				session.update(rawdata);
				// commit transaction
				transaction.commit();
			} catch (Exception e) {
				if (transaction != null) {
					transaction.rollback();
				}
				e.printStackTrace();
			}
			finally{
				
			}
		}
		
		public void rawDataparseStatus(Long generalDataId, boolean status,Rawdata rawdata)
		{
			if(rawdata.getId()==null)
			{
				return;
			}
			Transaction transaction = null;
			
			try (Session session = HibernateUtil.getSessionFactory().openSession()) {
				// start a transaction
				transaction = session.beginTransaction();

				
				rawdata.setParsed(status);
				rawdata.setGeneralDataId(generalDataId);
				// save the student object
				session.update(rawdata);
				// commit transaction
				transaction.commit();
			} catch (Exception e) {
				if (transaction != null) {
					transaction.rollback();
				}
				e.printStackTrace();
			}
			finally{
				
			}
		}

		public void parsedOk(Rawdata rawdata,Long ftm_packet_id)
		{
			if(rawdata.getId()==null)
			{
				return;
			}
			Transaction transaction = null;
			
			try (Session session = HibernateUtil.getSessionFactory().openSession()) {
				// start a transaction
				transaction = session.beginTransaction();

				
				rawdata.setParsed(true);
			
				// save the student object
				session.update(rawdata);
				// commit transaction
				transaction.commit();
			} catch (Exception e) {
				if (transaction != null) {
					transaction.rollback();
				}
				e.printStackTrace();
			}
			finally{
				
			}
		}

}

