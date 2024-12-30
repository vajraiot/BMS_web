import { Component, OnInit } from '@angular/core';
import { GeneralData, PlainManufacturerDetails } from 'src/app/interfaces';
import { GeneralDataSubjectService, ManufacturerDetailsService } from 'src/app/services';

@Component({
  selector: 'app-static-cards',
  templateUrl: './static-cards.component.html',
  styleUrls: ['./static-cards.component.css']
})
export class StaticCardsComponent implements OnInit {

  constructor(private manufacturerDetailsService:ManufacturerDetailsService,
    private generalDataSubjectService:GeneralDataSubjectService) { }

  ngOnInit(): void {
    this.generalDataSubjectService.getGeneralData().subscribe(
      (dta)=>{
        this.generalDataProcessing(dta);
      }
    );
  }


  generalDataProcessing(dta:GeneralData)
  {
    try{
  this.serviceGetManufacturerDetailsBySiteIdAndSerialNumber(dta.siteId,dta.deviceData[0].serialNumber);
    }
    catch(err)
    {
      
      this.pmd=null;   
    }
  }

  pmd:PlainManufacturerDetails;
 /*****************************************Services******************* */ 
serviceGetManufacturerDetailsBySiteIdAndSerialNumber(siteId:string,serialNumber:string)
{
  this.manufacturerDetailsService.getManufacturerDetailsBySiteIdAndSerialNumber(siteId,serialNumber)
  .subscribe(
    (data)=>{
      console.log("getManufacturerDetailsBySiteIdAndSerialNumber is:"+JSON.stringify(data));
          this.pmd=data;
       }
  );
}
}
