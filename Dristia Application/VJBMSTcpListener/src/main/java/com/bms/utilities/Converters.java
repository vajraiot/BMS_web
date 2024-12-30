package com.bms.utilities;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class Converters {
	
	 public  String convertStringToHex(String str){
		  
		  char[] chars = str.toCharArray();
		  
		  StringBuffer hex = new StringBuffer();
		  for(int i = 0; i < chars.length; i++){
		    hex.append(Integer.toHexString((int)chars[i]));
		  }
		  
		  return hex.toString().toUpperCase();
	  }
	  
	  public  String convertHexToString(String hex){

		  StringBuilder sb = new StringBuilder();
		  StringBuilder temp = new StringBuilder();
		  
		  //49204c6f7665204a617661 split into two characters 49, 20, 4c...
		  for( int i=0; i<hex.length()-1; i+=2 ){
			  
		      //grab the hex in pairs
		      String output = hex.substring(i, (i + 2));
		      //convert hex to decimal
		      int decimal = Integer.parseInt(output, 16);
		      //convert the decimal to character
		      sb.append((char)decimal);
			  
		      temp.append(decimal);
		  }
		 // System.out.println("Decimal : " + temp.toString());
		  
		  return sb.toString();
	  }
	  
	  public int convertHexToDecimal(String hex){
		  
		  String digits = "0123456789ABCDEF";
		  hex = hex.toUpperCase();
          int val = 0;
          for (int i = 0; i < hex.length(); i++)
          {
              char c = hex.charAt(i);
              int d = digits.indexOf(c);
              val = 16*val + d;
          }
          return val;
	  }
	  
	  public double convertHexToDouble(String hex)
	  {
		  return Double.valueOf(hex);
	  }
	  
	  //ex:"12.44" to 12.44
	  public float convertAsciiToFloat(String ascii)
	  {
		  float rtnf = Float.parseFloat(ascii);
		  return rtnf;
		  
	  }
	  
	  //ex:"12.44" to 12.44
	  public Boolean convertAsciiToBoolean(String ascii)
	  {
		  try{
			  Boolean rtnbln=false;
			if( Integer.parseInt(ascii)>0)
			{
				rtnbln =true;
			}
			else
			{
				rtnbln =false;
			}
			return rtnbln;
		  }
		  catch(Exception ex)
		  {
			  return false;
		  }
//		  Boolean rtnbln=Boolean.valueOf(ascii); 
		
		  
	  }
	  
	  
	  public Date convertUtcAsciiToDate(String strDate,String strTime)
	  {
		  
		  String sDateTime=strDate.trim()+" "+strTime.trim();   //250919 053230
		  System.out.println("string data is;"+sDateTime); 
		  Date date1 = null;
			try {
				date1 = new SimpleDateFormat("ddMMyy HHmmss").parse(sDateTime);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}  
		  
		return date1;  
	  }
	  
	  public Date convertUtcAsciiToDate2(String StrDateTimeAscii)
	  {
		  
		  String sDateTime=StrDateTimeAscii;   //250919 053230
		  System.out.println("string data is;"+sDateTime); 
		  Date date1 = null;
			try {
				date1 = new SimpleDateFormat("ddMMyyHHmmss").parse(sDateTime);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}  
		  
		return date1;  
	  }
	  
	  public Date convertHexToDate(String hexDate,String hexTime)
	  {
		  String strDate=convertHexToString(hexDate);
		  String strTime=convertHexToString(hexTime);
		  String sDateTime=strDate.trim()+" "+strTime.trim();   //25/09/2019 11:03:30
		  System.out.println("string data is;"+sDateTime); 
		  Date date1 = null;
			try {
				date1 = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").parse(sDateTime);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}  
		  
		return date1;  
	  }
	  
	    public boolean isDataExistInStringWith2c(String input,String searchAsciiData)
	    {
	    return isDataExistInString(  input, "2C"+convertStringToHex(searchAsciiData));
	    }
	    public boolean isDataExistInString(String input,String searchData)
	    {
	    	
	    	input=input.toUpperCase();
	    	
	    //	boolean isFound = input.indexOf(searchData.toUpperCase()) !=-1? true: false; //true

	    	boolean isFound = input.contains(searchData.toUpperCase()); // true
	    	return isFound;
	    	
	    }
	    
	    public List<String> dataSplitBy2C(String strRawData)
	    {
	    	strRawData=strRawData.trim().toUpperCase();
	    	//String filename = "abc.def.ghi";     // full file name
	    	String[] parts = strRawData.split("2C",strRawData.length()); // String array, each element is text between dots
	    	//List<String> dataList = new ArrayList<String>(parts.length);
	    	List<String> dataList = Arrays.asList(parts);
	    	
			return dataList;
	    	//String 
	    }
	    
	    public List<DataFormateTypeIs> dataSplitBy2CWithDifferentFormates(String strRawData)
	    {
	    	strRawData=strRawData.trim().toUpperCase();
	    	//String filename = "abc.def.ghi";     // full file name
	    	String[] parts = strRawData.split("2C",strRawData.length()); // String array, each element is text between dots
	    	//List<String> dataList = new ArrayList<String>(parts.length);
	    	List<String> dataList = Arrays.asList(parts);
	    	List<DataFormateTypeIs> lstDataFormateTypeIs=lstDataToForamteTypes(dataList);
			return lstDataFormateTypeIs;
	    	//String 
	    }
	    
	    public List<DataFormateTypeIs> lstDataToForamteTypes(List<String> dataList)
	    {
	    	List<DataFormateTypeIs> lstDataFormateTypeIs=new ArrayList<DataFormateTypeIs>(); 
	    	
	    	for(String strdataList:dataList)
	    	{
	    		DataFormateTypeIs dataFormateTypeIs=null;
	    		try {
	    			dataFormateTypeIs =DataFormateTypeIs.builder()
	    					.hex(strdataList)
	    					.asci(convertHexToString(strdataList))
	    					.decimal(convertHexToDecimal(strdataList))
	    					.build();
	    		}
	    		catch(Exception ex)
	    		{
	    			
	    		}
	    		finally
	    		{
	    			lstDataFormateTypeIs.add(dataFormateTypeIs);
	    		}
	    	}
	    
	    return lstDataFormateTypeIs;
	    }
	    
	public double convertHexToLatitude(String hexData)
	{
		hexData=hexData.toUpperCase();
		//hexData="907867759505200100000";
		//hexData ="1725.17140000";
		
		String asciiData=convertHexToString(hexData);
		asciiData=padRight(asciiData,12);
		
		System.out.println(asciiData);
		
		String lat_1 = asciiData.substring(0, 2);
		System.out.println(asciiData.substring(2, 4)+""+asciiData.substring(5, 10));
		float lat_2 = Float.parseFloat(asciiData.substring(2, 4)+""+asciiData.substring(5, 10));
		float lat_3 = lat_2/60;
		String latfinal_1 = String.format("%.0f", lat_3);
		String latfinal = lat_1 +"."+latfinal_1;
	//	System.out.println("lattitud is:"+latfinal);
		
	   return Double.valueOf(latfinal);
	}
	
	public double convertHexToLongitude(String hexData)
	{
		
		
		String asciiData=convertHexToString(hexData);
		asciiData=padRight(asciiData,12);
		String lon_1 = asciiData.substring(1, 3);
		float lon_2 = Float.parseFloat(asciiData.substring(3, 5)+""+asciiData.substring(6, 11));
		float lon_21 = (lon_2 / 60);
		String lonfinal_1 = String.format("%.0f", lon_21);
		String lonfinal = lon_1+"."+lonfinal_1;
		
		//System.out.println("longitude is:"+lonfinal);
		
		return Double.valueOf(lonfinal);
	}
	
	public String padRight(String str,int number)
	{
		String numbers="%-"+Integer.valueOf(number)+"s";
		return String.format(numbers, str).replace(' ', '0');
	}
	    


}
