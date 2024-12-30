package com.bms.server;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.BindException;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketAddress;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Formatter;
import java.util.Properties;
import java.util.ResourceBundle;
import java.util.Timer;






public class DMSSocketServer {

	
	
	
	private Socket socket = null;

	public void portListening(int portNumber) {

		boolean listening = true;
		ServerSocket serverSocket = null;

		try {
			serverSocket = new ServerSocket(portNumber);
			System.out.println("port opened for:"+portNumber);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("port opened exception:"+e);
			e.printStackTrace();
		}

		while (listening) {
			try {

				new DMSMultiServerThread(serverSocket.accept()).start();

			} catch (IOException e) {

				e.printStackTrace();
			}

		}
	}
	
	
	public static String bytesToHexString(byte[] bytes) {
		StringBuilder sb = new StringBuilder(bytes.length * 2);

		Formatter formatter = new Formatter(sb);
		for (byte b : bytes) {
			formatter.format("%02x", b);
		}

		return sb.toString();
	}
}


	


