package com.bms.utilities;

import java.sql.Types;

import org.hibernate.dialect.SQLServer2008Dialect;

public class UpdatedSQLServerDialect extends SQLServer2008Dialect {

	   public UpdatedSQLServerDialect () {
	      super();
	      registerColumnType(Types.DATE, "datetime1");
	   }
	}
