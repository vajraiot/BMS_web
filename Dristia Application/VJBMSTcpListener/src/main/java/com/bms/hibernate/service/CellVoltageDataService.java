package com.bms.hibernate.service;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bms.FindPacketDetails;
import com.bms.RawDataProcessing;
import com.bms.hibernate.util.HibernateUtil;
import com.bms.miscellaneous.PacketType;
import com.bms.model.BMSAlarmStatus;
import com.bms.model.BatteryMonitoringData;
import com.bms.model.CellVoltageData;
import com.bms.model.Rawdata;
import com.bms.pojo.RawdataDTO;


public class CellVoltageDataService {
	
	
	
		public void save(BatteryMonitoringData _batteryMonitoringData) {
			List<CellVoltageData>  _lstCellVoltageData=_batteryMonitoringData.getCellVoltageData();
			
		//	_lstCellVoltageData=_batteryMonitoringData.getCellVoltageData();
			for(CellVoltageData inst:_lstCellVoltageData)
			{

				inst.setBatteryMonitoringData(_batteryMonitoringData);
			}
			
			Transaction transaction = null;
			

	
			try (Session session = HibernateUtil.getSessionFactory().openSession()) {
				// start a transaction
				
				transaction = session.beginTransaction();

				

				// save the student object
				//session.persist(_batteryMonitoringData);
				System.out.println("_lstCellVoltageData size is:"+_lstCellVoltageData.size());
				
					
					for ( int i=0; i<_lstCellVoltageData.size(); i++ ) {
						CellVoltageData inst2=_lstCellVoltageData.get(i);
					    session.save(inst2);
					    if ( i % 20 == 0 ) { //20, same as the JDBC batch size
					        //flush a batch of inserts and release memory:
					        session.flush();
					        session.clear();
					    }
					}
				
				
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

