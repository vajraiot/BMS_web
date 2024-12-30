import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ComponentPathEnum } from 'src/app/enums';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private authService: AuthService, private router: Router) { }

  componentPathEnum=ComponentPathEnum ;

  canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
): Observable<boolean> {
    return this.authService.isLoggedIn
        .pipe(
            take(1),
            map((isLoggedIn: boolean) => {
                if (!isLoggedIn) {
                    console.log('refresh asdasdas');
                    this.router.navigate(['/' + ComponentPathEnum.Login3]);
                    return true;
                 
                }
                return true;
            })
        );
}

}
