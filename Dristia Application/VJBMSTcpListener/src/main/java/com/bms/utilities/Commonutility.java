package com.bms.utilities;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.apache.commons.lang3.StringUtils;

public class Commonutility {

	
	public static float byte2float(byte[] data) {
		
		//return new BigInteger(data).floatValue();
		float f=new BigInteger(data).floatValue();
	 return Float.valueOf(String.format(Locale.getDefault(), "%.4f", f));
	}
	
	public static float hex2ieee754tofloat(String data) {
		Long i = Long.parseLong(data, 16);
        Float f = Float.intBitsToFloat(i.intValue());
        
      //  return f;
        return Float.valueOf(String.format(Locale.getDefault(), "%.4f", f));
	}
	
	
	 public static int hex2decimal(String s) 
		{
			s=  s.replaceAll(" ", "");
		    String digits = "0123456789ABCDEF";
		    s = s.toUpperCase();
		    int val = 0;
		    for (int i = 0; i < s.length(); i++) {
		        char c = s.charAt(i);
		        int d = digits.indexOf(c);
		        val = 16*val + d;
		    }
		    return val;
		}
	 
	 public static float hex2float(String s) 
		{
			s=  s.replaceAll(" ", "");
		    String digits = "0123456789ABCDEF";
		    s = s.toUpperCase();
		    float val = 0.0f;
		    for (int i = 0; i < s.length(); i++) {
		        char c = s.charAt(i);
		        float d = digits.indexOf(c);
		        val = 16*val + d;
		    }
		   // return val;
		    
		    return Float.valueOf(String.format(Locale.getDefault(), "%.4f", val));
		}
	
	 public static String hex2ASCII(String hexValue)
		{
		      StringBuilder output = new StringBuilder("");
		      
		      for (int i = 0; i < hexValue.length(); i += 2)
		      {
		    	  
		         String str = hexValue.substring(i, i + 2);
		         
		         output.append((char) Integer.parseInt(str, 16));
		      }
		      return output.toString();
		       
		}
	 
	 
	 public static byte[] hex2Bytes(String str, boolean includeSpace)
	    {
	        if (includeSpace && !str.isEmpty() && str.charAt(str.length() -1) != ' ')
	        {
	            str += " ";
	        }
	        int cnt = includeSpace ? 3 : 2;
	        if (str.length() == 0 || str.length() % cnt != 0)
	        {
	            throw new RuntimeException("Not hex string");
	        }
	        byte[] buffer = new byte[str.length() / cnt];
	        char c;
	        for (int bx = 0, sx = 0; bx < buffer.length; ++bx, ++sx)
	        {
	            c = str.charAt(sx);
	            buffer[bx] = (byte)((c > '9' ? (c > 'Z' ? (c - 'a' + 10) : (c - 'A' + 10)) : (c - '0')) << 4);
	            c = str.charAt(++sx);
	            buffer[bx] |= (byte)(c > '9' ? (c > 'Z' ? (c - 'a' + 10) : (c - 'A' + 10)) : (c - '0'));
	            if (includeSpace)
	            {
	                ++sx;
	            }
	        }
	        return buffer;
	    }
	 
	 
	 static   String hex2Binary(String hex) {
	        int i = Integer.parseInt(hex, 16);
	        String bin = Integer.toBinaryString(i);
	        return bin;
	    }
	    
	    public static   Boolean bitposition(String HexInput,int pos) //0 based.
	    {
	    	
	    	
	    	String input=hex2Binary(HexInput);
	    	
	    	input=StringUtils.leftPad(input, 32, "0");
	    	 StringBuilder sb=new StringBuilder(input);
	    	   sb.reverse();  
	    	   input= sb.toString(); 
	    	String rtnstr= input.substring(pos, pos+1);
	    	Boolean rtnBoolean=Boolean.parseBoolean(rtnstr);
	    	if(Integer.parseInt(rtnstr)==1)
	    	{
	    		return true;
	    	}
	    	else
	    	{
	    		return false;
	    	}
	    
	    }
	    
	    
	    
	    public  static Boolean  isStringContainsAllZeros(String stext) {
	    	 char[] ch = new char[stext.length()];
	    	 
	    	 int cnt=0;
	    	  for (int i = 0; i < stext.length(); i++) { 
	              if(stext.charAt(i)=='0')
	              {
	            	cnt++;
	              }
	          }
	    	  
	    	 if(cnt==stext.length())
	    	 {
	    		 return true;
	    	 }
	    	 else
	    	 {
	    		 return false;
	    	 }
	    	 
		}
	    
	    public static Boolean isStringContainsSpaces(String stext)
	    {
	    
	   	 if (stext.contains(" ")) {
	           return true;
	   	 }
	   	 
	   	 else 
	   	 {
	   		 return false;
	   	 }
	    }
	    
	    
	    public static boolean isStringValid(String str)
		{
			char[] chArray=str.toCharArray();
			for(int cry=0;cry<chArray.length;cry++)
			{
				char ch=chArray[cry];
				if (ch == ' ' || ch == '\t' || ch == '\r' || ch == '\n') 
				 {
					return false;
				
						 
				}
			}
			return true;
		}
	    
	    public static String getSubstringbytes(int startByte,int numberOfBytes,String strRawData)
	    {
	    	
	    	
	    	int startIndex=startByte*2;
	    	String rtnStrBytes=strRawData.substring(startIndex, startIndex+(numberOfBytes*2));
	    	return rtnStrBytes;
	    	
	    }
	    
	    public static String getSubstringStartAndEndIndex(int startByte,int numberOfBytes,String strRawData)
	    {
	    	
	    	
	    	int startIndex=startByte*2;
	    	String rtnStrBytes=strRawData.substring(startIndex, (numberOfBytes*2));
	    	return rtnStrBytes;
	    	
	    }
	    
	    public  static Date convertBMSDateTimeToDate(String strDate,String strTime)
	    {
	    	Date rtnDate=null;
	    	//her date :17/12/2019 time:16:34:00
	    	  SimpleDateFormat gDateFormate= new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
	    	  String formDateTimeStr=strDate+" "+strTime;
	    	  try {
	    		  rtnDate =gDateFormate.parse(formDateTimeStr);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				
			}
	    	  
	    	  return rtnDate;
	    	  
	    	  
	    }
	
}
