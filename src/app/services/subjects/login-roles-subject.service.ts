import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LoginRoles } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginRolesSubjectService {

  constructor() { }

  private subject: BehaviorSubject<LoginRoles> = new BehaviorSubject(null);


  clearLoginRoles()
  {
    //this.subject.value.
    this.subject.next(null);
  }

  setLoginRoles(dta:LoginRoles)
  {
   this.subject.next(dta);
  }
  getLoginRoles(): Observable<LoginRoles> {
    return this.subject.asObservable();
  }

}
