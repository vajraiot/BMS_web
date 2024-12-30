import { Component, OnInit } from '@angular/core';
import {
  DashBoardService,
  SiteIdListService,
  AllAlarmsService,
  ApplicationUtilitiesService,
  LoginRolesSubjectService,
} from '../../services';

import { InstantaneousGraphsService } from '../../services';
import { SiteIdList, AllSitesAlarms, SiteLocation, CommnStatus, GeneralData } from 'src/app/interfaces';
import { from } from 'rxjs';

declare var $: any;

import * as Highcharts from 'highcharts';

declare var require: any;

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
require('highcharts/modules/heatmap')(Highcharts);
require('highcharts/modules/treemap')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);

//require('highcharts/modules/series-label')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashBoardService: DashBoardService,
    private siteIdListService: SiteIdListService,
    private instantaneousGraphsService: InstantaneousGraphsService,
    private allAlarmsService: AllAlarmsService,
    private applicationUtilitiesService: ApplicationUtilitiesService,
    private loginRolesSubjectService: LoginRolesSubjectService,
  ) { }

  /*************************************variables******************* **/
  gblSitedIdListArray: SiteIdList[];
  gblAllSitesAlarmsDataArray: AllSitesAlarms[];
  gblSiteLocationArray: SiteLocation[];
  commnStatusArray: CommnStatus[];
  generalDataArray: GeneralData[];

  ngOnInit(): void {
    this.applicationUtilitiesService.verifyLogin(); //this is for redirect login page if it is not login
    this.serviceGetCommnStatus();
    //  this.serviceGetSiteIdList();
    this.serviceGetGeneralDataForEachSiteIdAndSerailNumber();
  }
  /******************************************************************* */

  /*******************Regular Methods************************************ */
  allSitesAlarmsDataProcessing(dtaArray: AllSitesAlarms[]) {
    this.gblAllSitesAlarmsDataArray = dtaArray;
  }

  /*********************************************************************** */
  /********************************************************************************* */
  /*****************Services************************* */
  serviceGetAllSitesAlarmsData() {
    this.dashBoardService.getAllSitesAlarmsData().subscribe(
      (data) => {
        this.allSitesAlarmsDataProcessing(data);
      },
      (err) => { }
    );
  }

  serviceGetSiteIdList() {
    this.siteIdListService.getAllSiteIdWithSerialNumbers().subscribe(
      (data) => {
        console.warn('siteidList is:' + JSON.stringify(data));
        this.gblSitedIdListArray = data;
      },
      (err) => {
        console.error('error is:' + JSON.stringify(err));
      }
    );
  }

  serviceGetCommnStatus() {
    this.dashBoardService.getCommnStatus().subscribe(
      (data) => {
        /***************loginrole********* */
        this.loginRolesSubjectService.getLoginRoles()
          .subscribe((lgDta) => {
            try {

              if (lgDta.lstLoginCredentials[0].id === 2) {
                this.commnStatusArray = data.filter(d => {
                  return true;
                })
              }
              else {
                this.commnStatusArray = data;
              }
            } catch (err) {
              this.commnStatusArray = data;
            }

          });
        /******************************************** */


      },
      (err) => {
        console.error('error is:' + JSON.stringify(err));
      }
    );
  }



  serviceGetGeneralDataForEachSiteIdAndSerailNumber() {
    this.dashBoardService.getGeneralDataForEachSiteIdAndSerailNumber()

      .subscribe(
        (data) => {

          /***************loginrole********* */
          this.loginRolesSubjectService.getLoginRoles()
            .subscribe((lgDta) => {
              try {

                if (lgDta.lstLoginCredentials[0].id === 2) {
                  this.generalDataArray = data.filter(d => {
                    return true;
                  })
                }
                else {
                  this.generalDataArray = data;
                }
              } catch (err) {
                this.generalDataArray = data;
              }

            });
          /******************************************** */
        },
        (err) => {
          console.error('error is:' + JSON.stringify(err));
        }
      );
  }

  /************************************************* */
}
