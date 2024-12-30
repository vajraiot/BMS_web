import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ComponentPathEnum } from 'src/app/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router: Router ) { }

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  componentPathEnum= ComponentPathEnum;
  

  public get isLoggedIn() 
  {
     console.log("enter in  get isLoggedIn():");
  // return true;
   return this.loggedIn.asObservable();
  }

getlogin() : boolean
{
  return this.loggedIn.getValue();
}
  public setLogin()
  {
    this.loggedIn.next(true);
  }


  setlogout()
  {
   
   this.loggedIn.next(false);
   this.router.navigate(['/'+this.componentPathEnum.Login3]);
   
   }

}
