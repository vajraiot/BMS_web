package com.bms.hibernate.service;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bms.FindPacketDetails;
import com.bms.RawDataProcessing;
import com.bms.hibernate.util.HibernateUtil;
import com.bms.miscellaneous.PacketType;
import com.bms.model.BatteryMonitoringData;
import com.bms.model.GeneralData;
import com.bms.model.Rawdata;
import com.bms.pojo.RawdataDTO;


public class BatteryMonitoringDataService {
	
	
	
		public BatteryMonitoringData save(GeneralData _generalData,BatteryMonitoringData _batteryMonitoringData) {

			_batteryMonitoringData.setGeneralData(_generalData);
			Transaction transaction = null;
			
//			_batteryMonitoringData.setAmbientTemperature(2.35f);
	
			try (Session session = HibernateUtil.getSessionFactory().openSession()) {
				// start a transaction
				
				transaction = session.beginTransaction();

				
				session.saveOrUpdate(_batteryMonitoringData);
				// commit transaction
				transaction.commit();
				
			} catch (Exception e) {
				if (transaction != null) {
					transaction.rollback();
				}
				e.printStackTrace();
			}
			finally{
				return _batteryMonitoringData;
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


		public BatteryMonitoringData getBatteryMonitoringData() {

			Transaction transaction = null;
	
			try (Session session = HibernateUtil.getSessionFactory().openSession()) {
				// start a transaction
				transaction = session.beginTransaction();
				
				BatteryMonitoringData btm= session.get(BatteryMonitoringData.class,10013l);
				transaction.commit();
				return btm;
			} catch (Exception e) {
				if (transaction != null) {
					transaction.rollback();
				}
				e.printStackTrace();
				return null;
			}
			
			
		}



}

