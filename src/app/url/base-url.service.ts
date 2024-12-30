import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  constructor() { }
}


export const GlobalVariable = Object.freeze({
  //BASE_API_URL: 'http://127.0.0.1:4582/',
 //BASE_API_URL: 'http://183.82.2.109:4582/',
 BASE_API_URL: 'http://122.175.45.16:51470/',
  //... more of your variables
});