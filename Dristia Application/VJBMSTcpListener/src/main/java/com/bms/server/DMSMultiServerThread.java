package com.bms.server;

import java.io.IOException;
import java.net.Socket;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Formatter;


import com.bms.DBConnection;
import com.bms.BMSDataProcessing;
import com.bms.RawDataProcessing;
import com.bms.hibernate.service.RawdataService;
import com.bms.pojo.RawdataDTO;

public class DMSMultiServerThread extends Thread{

	
	  //  @Autowired
	 //  GetRawPackeinterfaceservice retRawPackeinterfaceservice ;
	    
		//@Autowired
	//	private RawPacketReposInterface rawPacketReposInterface;
	   
	
	private Socket socket = null;
	private String rawpacket = null;
    public DMSMultiServerThread(Socket socket) {
        this.socket = socket;
    }
    
  
	
    public static String binaryToHex(String bin){
    	   return Long.toHexString(Long.parseLong(bin,16));
    	}
    
    public static String bytesToHexString(byte[] bytes) {
        StringBuilder sb = new StringBuilder(bytes.length * 2);
     
        Formatter formatter = new Formatter(sb);
        for (byte b : bytes) {
            formatter.format("%02x", b);
        }
     
        return sb.toString();
    }
    
    public void run(){
    	
    	
    	byte[] resultBuff = new byte[0];
	    byte[] buff = new byte[1024];
	    int k = -1;
	    try {
			while((k = socket.getInputStream().read(buff, 0, buff.length)) > -1) {
			    byte[] tbuff = new byte[resultBuff.length + k]; // temp buffer size = bytes already read + bytes last read
			    System.arraycopy(resultBuff, 0, tbuff, 0, resultBuff.length); // copy previous bytes
			    System.arraycopy(buff, 0, tbuff, resultBuff.length, k);  // copy current lot
			    resultBuff = tbuff; // call the temp buffer as your result buff
			    //TODO
			   // System.out.println("Port:"+socket.getLocalPort());
			   
			}
			// System.out.println(bytesToHexString(resultBuff));
			if(resultBuff.length>0)
				insertRawData((resultBuff));
			
			 socket.close();	
		
		    
		} catch (IOException e) {
			// TODO Auto-generated catch block
			
			e.printStackTrace();
		}
	    finally
	    {
	    	 //socket.close();	
	    	
	    	 
	    }
	    
    	

		
    }
    
    public void insertRawData(byte[] rawData)
    {
    	
    	String strbytes= bytesToHexString(rawData).toUpperCase();
    
    	new BMSDataProcessing().packetProcess(strbytes);
    }
    public void inserttoDataBase(byte[] rawData)
	{
		
    	DBConnection db=new DBConnection();
    	Connection conn=db.getMyConnection();
    	  Statement stmt=null;
    	
    	try {
			stmt = conn.createStatement();
		
			
			String strbytes= bytesToHexString(rawData).toUpperCase();
       //   String sql="insert into raw_packetentityclass(raw_packet) values('"+bytesToHexString(rawData)+"');";
			   String sql="insert into rawdata(rawdata,[datalength]) values('"+strbytes+"',"+strbytes.length()+");";
    	
			stmt.executeUpdate(sql);
			stmt.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("exp"+e);
			//e.printStackTrace();
			
		}
    	catch(Exception e){
    	      //Handle errors for Class.forName
    		System.out.println("exp"+e);
    	   }
    	
    	finally{
    	      //finally block used to close resources
    	      try{
    	         if(stmt!=null)
    	            conn.close();
    	      }catch(SQLException se){
    	      }// do nothing
    	      try{
    	         if(conn!=null)
    	            conn.close();
    	      }catch(SQLException se){
    	         se.printStackTrace();
    	      }//end finally try
    	   }//end try
    	  // System.out.println("Goodbye!");
    
    

	}
	
}