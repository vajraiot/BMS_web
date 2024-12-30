import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './bms/dashboard/dashboard.component';
import { ComponentPathEnum } from './enums/component-path-enum.enum';
import { TestingComponent } from './bms/test/testing/testing.component';
import { Testing2Component } from './bms/test/testing2/testing2.component';
import { Testing3Component } from './bms/test/testing3/testing3.component';
import { LoginComponent } from './bms/login/login.component';
import { SideBarComponent } from './bms/side-bar/side-bar.component';
import { Testing4Component } from './bms/test/testing4/testing4.component';
import { Tesing5Component } from './bms/test/tesing5/tesing5.component';
import { RawDataComponent } from './bms/raw-data/raw-data.component';
import {RealTimeViewComponent} from './bms/real-time-view/real-time-view.component';
import { from } from 'rxjs';
import { SingleBmsDataViewComponent } from './bms/real-time-view';
import { UnderDevelopmentComponent } from './bms/under-development/under-development.component';
import { LoginPageComponent } from './bms/login-page/login-page.component';
import { AlarmsReportComponent, DayWiseComponent, HistoricalComponent, MonthlyComponent } from './bms/Reports';
import { SiteLocationComponent } from './bms/configuration/site-location/site-location.component';
import { Login3Component } from './bms/login3/login3.component';
import { AuthGuardService } from './services';
import { ManufacturerDetailsComponent } from './bms/configuration/manufacturer-details/manufacturer-details.component';


const routes: Routes = [
 { path: '', redirectTo: ComponentPathEnum.Login3, pathMatch: 'full' },
 //{ path: '', redirectTo: ComponentPathEnum.RealTimeView, pathMatch: 'full' },
  {
    path: ComponentPathEnum.Login,
    component: LoginComponent
  },
  {
    path: ComponentPathEnum.Login2,
    component: LoginPageComponent
  },

  {
    path: ComponentPathEnum.Login3,
    component: Login3Component
  },

  {
    path: ComponentPathEnum.DashBoard,
    component: DashboardComponent,
   // canActivate: [AuthGuardService]
  },

  {
    path: ComponentPathEnum.RealTimeView,
    component: RealTimeViewComponent,
  },
  
  {
    path: ComponentPathEnum.SingleBmsDataView,
    component: SingleBmsDataViewComponent,
  },

  
  {
    path: ComponentPathEnum.ReportHistorical,
    component: HistoricalComponent,
  },


  
  {
    path: ComponentPathEnum.ReportDayWise,
    component:DayWiseComponent,
  },


  
  {
    path: ComponentPathEnum.ReportMonthly,
    component: MonthlyComponent,
  },

  

  {
    path: ComponentPathEnum.AlarmsReport,
    component: AlarmsReportComponent,
    //loadChildren:'./bms/'
  },

  {
    path: ComponentPathEnum.SiteLocation,
    component: SiteLocationComponent,
  },

   
  {
    path: ComponentPathEnum.ManufacturerDetails,
    component:ManufacturerDetailsComponent,
  },
  
  
  {
    path: ComponentPathEnum.UnderDevelopment,
    component: UnderDevelopmentComponent,
  },
  

  {
    path: ComponentPathEnum.RawData,
    component: RawDataComponent
  },
  {
    path: ComponentPathEnum.Testing1,
    component: TestingComponent
  },

  {
    path: ComponentPathEnum.Testing2,
    component: Testing2Component
  },

  {
    path: ComponentPathEnum.Testing3,
    component: Testing3Component
  },
  {
    path: ComponentPathEnum.Testing4,
    component: Testing4Component
  },
  {
    path: ComponentPathEnum.Testing5,
    component: Tesing5Component
  },

  {
    path: ComponentPathEnum.SideBar,
    component: SideBarComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
