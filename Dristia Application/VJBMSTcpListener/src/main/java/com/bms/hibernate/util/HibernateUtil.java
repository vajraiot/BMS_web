package com.bms.hibernate.util;

import java.util.Properties;

import java.util.ResourceBundle;

import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.cfg.Environment;
import org.hibernate.service.ServiceRegistry;

import com.bms.model.BMSAlarmStatus;
import com.bms.model.BatteryMonitoringData;
import com.bms.model.CellTemperatureData;
import com.bms.model.CellVoltageData;
import com.bms.model.GeneralData;
import com.bms.model.Rawdata;
import com.bms.model.RawdataParsed;

public class HibernateUtil {

	private static SessionFactory sessionFactory;

	public static SessionFactory getSessionFactory() {

		ResourceBundle rb = ResourceBundle.getBundle("hibernate");

		if (sessionFactory == null) {
			try {
				Configuration configuration = new Configuration();
				// Hibernate settings equivalent to hibernate.cfg.xml's properties
				Properties settings = new Properties();
				settings.put(Environment.DRIVER, rb.getString("driverClassName"));
				settings.put(Environment.URL, rb.getString("url"));
				settings.put(Environment.USER, rb.getString("username"));
				settings.put(Environment.PASS, rb.getString("password"));
				settings.put(Environment.DIALECT, rb.getString("database_platform"));
				settings.put(Environment.SHOW_SQL, rb.getString("show-sql"));
				settings.put(Environment.CURRENT_SESSION_CONTEXT_CLASS, "thread");
				settings.put(Environment.HBM2DDL_AUTO, rb.getString("ddl-auto").trim());
				configuration.setProperties(settings);
//                configuration.addAnnotatedClass(Student.class);
				
				configuration.addAnnotatedClass(Rawdata.class);
				//configuration.addAnnotatedClass(RawdataParsed.class);
				
				configuration.addAnnotatedClass(BatteryMonitoringData.class);
				configuration.addAnnotatedClass(BMSAlarmStatus.class);
				configuration.addAnnotatedClass(CellTemperatureData.class);
				configuration.addAnnotatedClass(CellVoltageData.class);
				configuration.addAnnotatedClass(GeneralData.class);
				
				/*************************************/
	
				configuration.addAnnotatedClass(Rawdata.class);
				
				
				
				/*************************************/
				

				ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
						.applySettings(configuration.getProperties()).build();
				sessionFactory = configuration.buildSessionFactory(serviceRegistry);
			} catch (Exception e) {
				 System.err.println("Initial SessionFactory creation failed." + e);
				e.printStackTrace();
			}
		}
		return sessionFactory;
	}
}
