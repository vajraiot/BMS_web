package com.bms.utilities;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class DataFormateTypeIs {
	
	private String hex;
	private String asci;
	private int decimal;
	
	@Override
	public String toString() {
		return "  hex=" + hex + ", asci=" + asci + ", decimal=" + decimal + "";
	}
	
	
	
	

}
