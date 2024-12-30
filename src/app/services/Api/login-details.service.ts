import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LoginRoles } from '../../interfaces/login-roles';
import { RoleType } from '../../enums/role-type.enum';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalVariable } from '../../url/base-url.service';
@Injectable({
  providedIn: 'root'
})
export class LoginDetailsService {


  basedomain: string;
  constructor(private router: Router, private htp: HttpClient) {
    //  this.basedomain="http://127.0.0.1:4582/";
    this.basedomain = GlobalVariable.BASE_API_URL;
    //this.basedomain = environment.apiUrl;

  }
  /********************Auth Related*************** */

  private logginDetails: BehaviorSubject<LoginRoles> = new BehaviorSubject<LoginRoles>({} as any);

  getLoginDetails() {
    return this.logginDetails;
  }
  setLoginRoles(lgnRoles: LoginRoles) {

    let inst = this.logginDetails.getValue();

    // inst=lgnRoles;
    this.logginDetails.next(lgnRoles);
  }
  getLoginRoles(): LoginRoles {
    return this.logginDetails.getValue();
  }


  getRoleTypeEnum() {
    return RoleType;
  }
  /*********************************************** */

  /************************Login Api Calling************************** */
  checkCredentials(role, username, password) {
    let params = new HttpParams();

    params = params.append('role', role);
    params = params.append('username', username);
    params = params.append('password', password);

    console.log('role:' + role + ' userNae:' + username + ' password:' + password);

    const api = 'GetAllLoginDetailsByCredentials';
    return this.htp.get<LoginRoles>(this.basedomain + api, { params: params });
  }


  getListofLoginRoles() {
    let api = "getListofLoginRoles";
    console.log("basedomain:" + this.basedomain)
    //return   this.htp.get<any>(this.basedomain+api);

    return this.htp.get<any>(this.basedomain + api);

  }
}
