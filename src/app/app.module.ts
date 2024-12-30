import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './bms/dashboard/dashboard.component';
import { TestingComponent } from './bms/test/testing/testing.component';
import { Testing2Component } from './bms/test/testing2/testing2.component';
import { Testing3Component } from './bms/test/testing3/testing3.component';
import { LoginComponent } from './bms/login/login.component';
import { SideBarComponent } from './bms/side-bar/side-bar.component';
import { Testing4Component } from './bms/test/testing4/testing4.component';
import { Tesing5Component } from './bms/test/tesing5/tesing5.component';
import {AppMaterialModule} from './app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RawDataComponent } from './bms/raw-data/raw-data.component';

import { AgmCoreModule } from '@agm/core';            // @agm/core
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { InstantaneousDataComponent } from './bms/graphs/instantaneous-data/instantaneous-data.component';


import { RealTimeViewComponent } from './bms/real-time-view/real-time-view.component';


import { from } from 'rxjs';

import { SiteLocationConfigComponent } from './bms/site-location-config/site-location-config.component';
//import { AgmDirectionModule } from 'agm-direction';   // agm-direction
import {Footer2Component} from './bms/footer2/footer2.component';
import {UnderDevelopmentComponent} from './bms/under-development/under-development.component';
import{LoginPageComponent} from './bms/login-page/login-page.component';

import { StringParamComponent } from './bms/tables/string-param/string-param.component';
import {CellTableComponent, CellGraphsComponent, DeviceAlarmComponent, DeviceLocationComponent, CellPicstorialRepresentationComponent, AllCellsPictorialRepresentaionComponent, SingleBmsDataViewComponent, LegendsRepresentationComponent, LegendsRepresentation2Component, StaticCardsComponent} from './bms/real-time-view';
import {AllSitesLocationsComponent, AllSitesCommnStatusComponent, DashBoardBMSStatusComponent, AllSitesAlarmsComponent} from './bms/dashboard';
import { HistoricalComponent } from './bms/Reports/historical/historical.component';
import { SiteLocationComponent } from './bms/configuration/site-location/site-location.component';
import { SiteLocationMapComponent } from './bms/configuration/site-location-map/site-location-map.component';
import { Login3Component } from './bms/login3/login3.component';
import { DeviceAlarm2Component } from './bms/real-time-view/';

import { InstantaneousDataViewComponent } from './bms/real-time-view/single-bms-data-view/instantaneous-data-view/instantaneous-data-view.component';
import { CummulativeDataViewComponent } from './bms/real-time-view/single-bms-data-view/cummulative-data-view/cummulative-data-view.component';
import { ChargeCycleWiseDataViewComponent } from './bms/real-time-view/single-bms-data-view/charge-cycle-wise-data-view/charge-cycle-wise-data-view.component';
import { DischargeCycleWiseDataViewComponent } from './bms/real-time-view/single-bms-data-view/discharge-cycle-wise-data-view/discharge-cycle-wise-data-view.component';


import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AlarmsReportComponent } from './bms/Reports/alarms-report/alarms-report.component';
import { ManufacturerDetailsComponent } from './bms/configuration/manufacturer-details/manufacturer-details.component';
import { DayWiseComponent } from './bms/Reports/day-wise/day-wise.component';
import { MonthlyComponent } from './bms/Reports/monthly/monthly.component';
import { SpecificCellGraphsComponent } from './bms/real-time-view/single-bms-data-view/specific-cell-graphs/specific-cell-graphs.component';
 
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TestingComponent,
    Testing2Component,
    Testing3Component,
    LoginComponent,
    SideBarComponent,
    Testing4Component,
    Tesing5Component,
    RawDataComponent,
    CellTableComponent,
    CellGraphsComponent,
    DeviceAlarmComponent,
    DeviceLocationComponent,
    InstantaneousDataComponent,
    CellPicstorialRepresentationComponent,
    AllCellsPictorialRepresentaionComponent,
    RealTimeViewComponent,
    SingleBmsDataViewComponent,
    LegendsRepresentationComponent,
    AllSitesLocationsComponent,
    AllSitesCommnStatusComponent,
    
    AllSitesAlarmsComponent,
    SiteLocationConfigComponent,
    Footer2Component,
    UnderDevelopmentComponent,
    LoginPageComponent,
    DashBoardBMSStatusComponent,
    StringParamComponent,
    LegendsRepresentation2Component,
    HistoricalComponent,
    SiteLocationComponent,
    SiteLocationMapComponent,
    Login3Component,
    DeviceAlarm2Component,
    StaticCardsComponent,
    
    InstantaneousDataViewComponent,
    
    CummulativeDataViewComponent,
    
    ChargeCycleWiseDataViewComponent,
    
    DischargeCycleWiseDataViewComponent,
    
    AlarmsReportComponent,
    
    ManufacturerDetailsComponent,
    
    DayWiseComponent,
    
    MonthlyComponent,
    
    SpecificCellGraphsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDRsvO4B8wU4AtMjhgRkjRx0YVdrfwouN4',

    }),
    //AgmDirectionModule,
  ],
  providers: [ { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
