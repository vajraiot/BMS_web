import { Component, OnInit, Inject } from '@angular/core';
import { ComponentPathEnum } from 'src/app/enums';
import { Router } from '@angular/router';
import { LoginDetailsService, AuthService, LoginRolesSubjectService } from 'src/app/services';
import { DOCUMENT } from '@angular/common';
import { LoginRoles } from 'src/app/interfaces';
import { FormGroup } from '@angular/forms';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private loginDetailsService: LoginDetailsService,
    private authService: AuthService,
    @Inject(DOCUMENT) private _document,
    private loginRolesSubjectService:LoginRolesSubjectService,

  ) {}

  ngOnInit(): void {
    this.lstStrLoginRoles = [];
    this._document.body.classList.add('bodybg-color');

    this.serviceGetLoginRoles();
  }

  /**************************************************Variables********************* */

  form: FormGroup; // {1}
  private formSubmitAttempt: boolean; // {2}

  errorResponse: any;
  showErrorResponse = false;

  lstStrLoginRoles: [];

  roleSelected: any;
  gblNgUserName = '';
  gblNgPassword = '';
  /********************************************************************** */

  /*************************************Event Methods************************* */
  OnLogin(): void {
    console.log(
      'roleSelected is:' +
        this.roleSelected +
        ' username:' +
        this.gblNgUserName +
        ' password:' +
        this.gblNgPassword
    );
    this.navigateToDashboard();
  }
  /*************************************************************************** */
  /******************************Regular Method**************** */
  navigateToDashboard(): void {
    if (this.roleSelected == '' || this.roleSelected == null) {
      this.showErrorMessage('please select the Role');
      return;
    }
    if (this.gblNgUserName == '') {
      this.showErrorMessage('please enter the UserName');
      return;
    }
    if (this.gblNgPassword == '') {
      this.showErrorMessage('please enter the Password.');
      return;
    }

    this.serviceValidateCredentials(this.roleSelected,this.gblNgUserName,this.gblNgPassword);

  }

  showErrorMessage(erroMessag: string) {
    this.showErrorResponse = true;
    this.errorResponse = erroMessag;
  }

  loginResponseDataProcessing(dta:LoginRoles)
  {
   if(dta==null)
   {
    this.showErrorMessage("Please check UserName or Password.");
    return;
   }
   else
   {
    
    this.authService.setLogin();
    this.loginRolesSubjectService.setLoginRoles(dta);
    this.router.navigate(['/' + ComponentPathEnum.DashBoard]);
   }
  }
  /**************************************************************** */

  /*****************************Service Methods*********************************** */
serviceGetLoginRoles() {
    console.log('GetLoginRolesMethodCalling...');
    this.loginDetailsService.getListofLoginRoles().subscribe(
      (data) => {
        this.lstStrLoginRoles = data;
      },
      (err) => {
        this.lstStrLoginRoles = [];
        console.log(' fetch error : ' + err);
      }
    );
  }

  serviceValidateCredentials(role: string, username: string, password: string) {
    console.log('GetLoginRolesMethodCalling...');
    this.loginDetailsService
      .checkCredentials(role, username, password)
      .pipe(
        tap(tp=>{
          console.clear();
          console.log(tp);          
          }),

      )
      .subscribe(
        (data) => {
         this.loginResponseDataProcessing(data);
        },
        (err) => {
          this.lstStrLoginRoles = [];
          console.log(' fetch error : ' + err);
        }
      );
  }
  /******************************************************************************** */

  ngOnDestroy() {
    // remove the class form body tag
    console.log('ngonDestroy method calling...');
    this._document.body.classList.remove('bodybg-color');
  }
}
