package com.bms.hibernate.service;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bms.FindPacketDetails;
import com.bms.RawDataProcessing;
import com.bms.hibernate.util.HibernateUtil;
import com.bms.miscellaneous.PacketType;
import com.bms.model.BMSAlarmStatus;
import com.bms.model.BatteryMonitoringData;
import com.bms.model.Rawdata;
import com.bms.pojo.RawdataDTO;


public class BMSAlarmStatusService {
	
	
	
		public BMSAlarmStatus save(BatteryMonitoringData _batteryMonitoringData) {
			BMSAlarmStatus _bMSAlarmStatus=_batteryMonitoringData.getBMSAlarmStatus();
			Transaction transaction = null;
			
			_bMSAlarmStatus.setBatteryMonitoringData(_batteryMonitoringData);
	
			try (Session session = HibernateUtil.getSessionFactory().openSession()) {
				// start a transaction
				
				transaction = session.beginTransaction();

				

				// save the student object
				//session.persist(_batteryMonitoringData);
				session.save(_bMSAlarmStatus);
				// commit transaction
				transaction.commit();
				
			} catch (Exception e) {
				if (transaction != null) {
					transaction.rollback();
				}
				e.printStackTrace();
			}
			finally{
				return _bMSAlarmStatus;
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

