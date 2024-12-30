import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {GeneralData} from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GeneralDataSubjectService {

  constructor() { }

   //private subject=  new BehaviorSubject<MewaVtsSingleDevice[]>();
   private subject: BehaviorSubject<GeneralData> = new BehaviorSubject(null);


   clearGeneralData()
   {
     this.subject.next(null);
   }
 
   setGeneralData(dta:GeneralData)
   {
    this.subject.next(dta);
   }
   getGeneralData(): Observable<GeneralData> {
     return this.subject.asObservable();
   }
}
