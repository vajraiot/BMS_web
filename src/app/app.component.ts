import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ComponentPathEnum } from './enums/component-path-enum.enum';
import { AuthService, LoginRolesSubjectService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'VJ-BatteryMonitoringSystem-Web';
  /*****************Global Variables********************** */
  showHead = true;
  componentPathEnum: any;
  /******************************************************* */

  getComponentPathEnum(): ComponentPathEnum {
    return this.componentPathEnum;
  }
  constructor(private router: Router,
    private authService:AuthService,
    private loginRolesSubjectService:LoginRolesSubjectService,) {
    this.componentPathEnum = ComponentPathEnum;
    this.routerEventSubscribe();
  }
  ngOnInit(): void {
    //this.sideBar();

  }

  /***********************Event Methods*************************** */
  routerEventSubscribe() {
   
      this.router.events.forEach((event) => {
        //this.verifyLogin();
        if (event instanceof NavigationStart) {
          
          if (event.url === '/' + ComponentPathEnum.Login3 || event.url === '/') {
           this.showHead = false;

          } else {
            // console.log("NU")
            this.showHead = true;
         // this.sideBar();
          }
        }
      });
    }
    
   
  
  onLogout() {
   this.authService.setlogout();
   this.loginRolesSubjectService.clearLoginRoles();
    this.router.navigate(['/' + ComponentPathEnum.Login3]);
  }
  /*************************************************************** */
  sideBar() {
    console.log("sideBar method Called..");
    $(document).ready(function () {
      var trigger = $('.hamburger'),
        overlay = $('.overlay'),
         isClosed = false;

         trigger.removeClass('is-closed');
        trigger.removeClass('is-open');
        
        $('[data-toggle="offcanvas"]').unbind('click');
        trigger.unbind('click');
        $('#wrapper').unbind('toggleClass');
        
       console.log("inside the document Ready Function..");
       trigger.addClass('is-closed');
      //$('#wrapper').toggleClass('toggled');
      
     
      trigger.click(function () {
        hamburger_cross();
      });

      function hamburger_cross() {
        console.log("hamburger_cross is called:");
        if (isClosed == true) {
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
      }
  //   console.log('event is :' + $('[data-toggle="offcanvas"]').click);
    $('[data-toggle="offcanvas"]').unbind('click');
       $('[data-toggle="offcanvas"]').click(function () {
        console.log('jquery working.......');
        $('#wrapper').toggleClass('toggled');
      });

    });
  }

  sideBarOld() {

    $(document).ready(function () {
      var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = true;
        
        trigger.addClass('is-open');
        $('#wrapper').toggleClass('toggled');
       
      trigger.click(function () {
        hamburger_cross();
      });

      function hamburger_cross() {

        if (isClosed == true) {
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
      }

      $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
      });
    });
  }

}
