import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertersService {

  constructor() { }

  
   convertOwlDatetimeToCustomDate(str) { //input-2020-07-02T06:16:43.298+0000 to output 2020-02-11 00:29:04

    if (str == '') {
      return '';
    }

    var date = new Date(str),
      yr = (date.getFullYear()),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2),
      hour = ("0" + date.getHours()).slice(-2),
      minutes = ("0" + date.getMinutes()).slice(-2),
      seconds = ("0" + date.getSeconds()).slice(-2);


    return yr + "-" + mnth + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    //  return  day+"/"+mnth+"/"+yr +" "+hour+":"+minutes+":"+seconds;
    // return [date.getFullYear(), mnth, day].join("-");
  }

  
  convertOwlDatetimeToOnlyDate(str) { //input-2020-07-02T06:16:43.298+0000 to output 2020-02-11

    if (str == '') {
      return '';
    }

    var date = new Date(str),
      yr = (date.getFullYear()),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2),
      hour = ("0" + date.getHours()).slice(-2),
      minutes = ("0" + date.getMinutes()).slice(-2),
      seconds = ("0" + date.getSeconds()).slice(-2);

      return yr + "-" + mnth + "-" + day;
  }


  convertToFistDateTime(strDate) :string
  {
    try{
   let lclfirstAndLastDateTime:firstAndLastDateTime={} as firstAndLastDateTime;
   let dateTime=this.convertOwlDatetimeToCustomDate(strDate);
  
   return dateTime.substring(0,10)+" 00:00:00";;
   }
    catch(err)
    {
      return null;
    }
  }

  convertToLastDateTime(strDate) :string
  {
    try{
   let lclfirstAndLastDateTime:firstAndLastDateTime={} as firstAndLastDateTime;
   let dateTime=this.convertOwlDatetimeToCustomDate(strDate);
  
   dateTime.substring(0,10)+" 23:59:59";
   }
    catch(err)
    {
      return null;
    }
  }
  
  convertToFistAndLastDateTime(strDate) :firstAndLastDateTime
  {
    try{
   let lclfirstAndLastDateTime:firstAndLastDateTime={} as firstAndLastDateTime;
   let fistDateTime=this.convertOwlDatetimeToCustomDate(strDate);
   //lclfirstAndLastDateTime.firstDateTime=fistDateTime;

   lclfirstAndLastDateTime.firstDateTime=fistDateTime.substring(0,10)+" 00:00:00";;
   lclfirstAndLastDateTime.lastDateTime=fistDateTime.substring(0,10)+" 23:59:59";

   return lclfirstAndLastDateTime;
    }
    catch(err)
    {
      return null;
    }
  }
  
   secondsTohhmmss(totalSeconds)
  {
    try{
    var hours   = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
  
    // round seconds
    seconds = Math.round(seconds * 100) / 100
  
    let hr = (hours < 10 ? "0" + hours : hours);
    let mn =  (minutes < 10 ? "0" + minutes : minutes);
    let sc= (seconds  < 10 ? "0" + seconds : seconds);
    let totalTime= hr+':'+mn+':'+sc;
    return totalTime;
  }
  
  catch(error)
  {
    return '--';
  }
}
}

interface firstAndLastDateTime
{
  firstDateTime:string;
  lastDateTime:string;
}
