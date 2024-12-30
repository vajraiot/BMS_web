import { Component, OnInit } from '@angular/core';
import { DeviceData, GeneralData } from 'src/app/interfaces';
import { ConvertersService, GeneralDataSubjectService } from 'src/app/services';

@Component({
  selector: 'app-cummulative-data-view',
  templateUrl: './cummulative-data-view.component.html',
  styleUrls: ['./cummulative-data-view.component.css']
})
export class CummulativeDataViewComponent implements OnInit {

  
constructor(private generalDataSubjectService:GeneralDataSubjectService,
  public convertersService:ConvertersService) { }

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
