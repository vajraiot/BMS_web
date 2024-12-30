import { Component, OnInit } from '@angular/core';
import { DeviceData, GeneralData } from 'src/app/interfaces';
import { GeneralDataSubjectService } from 'src/app/services';

@Component({
  selector: 'app-instantaneous-data-view',
  templateUrl: './instantaneous-data-view.component.html',
  styleUrls: ['./instantaneous-data-view.component.css']
})
export class InstantaneousDataViewComponent implements OnInit {

  constructor(private generalDataSubjectService:GeneralDataSubjectService) { }

  ngOnInit(): void {
    
this.generalDataSubjectService.getGeneralData().subscribe((dta)=>{
  this.generalDataProcessing(dta);
});
  }

  generalDataProcessing(genearalData:GeneralData)
  {
    try{
    this.deviceDataProcessing(genearalData.deviceData[0]);
    }
    catch(err)
    {
      console.error("error occured in all cells pictorial representation.");  
    }
  }
  gblBmsDeviceData:DeviceData;
  deviceDataProcessing(bmsDeviceData: DeviceData)
  {
    this.gblBmsDeviceData=bmsDeviceData;
  }
}
