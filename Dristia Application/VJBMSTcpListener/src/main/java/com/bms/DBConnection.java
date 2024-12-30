package com.bms;


import java.sql.Connection;
import java.sql.DriverManager;
import java.util.logging.Logger;
/**
 * @author Kadaveru
 *
 */
public class DBConnection {

	Logger logger = Logger.getLogger(this.getClass().getSimpleName());

	Connection myConn = null;
	String username = "sa";
	String password = "greenark_123";
	//String password = "123";
	String url = "jdbc:sqlserver://localhost:1433;DatabaseName=GAEJAVARAWPACKETS";

	public DBConnection(){
		if (myConn==null){
			this.init();
		}
	}
	
	public Connection getMyConnection(){
		return myConn;
	}
	
	public DBConnection(String username, String password, String url){
		this.username = username;
		this.password = password;
		this.url = url;
	}

	private void init() {
		try {
			//System.out.println("init method called");
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			myConn = DriverManager.getConnection(url,username, password);
    // System.out.println("Connection established Successfully....");
			
		} catch (ClassNotFoundException e) {
			logger.info("{}");
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
	}
	public static void closeQuietly(Connection conn) {
		try {
			if (conn != null) {
				conn.close();
				}
			} catch (Exception e) {}
	}

}
