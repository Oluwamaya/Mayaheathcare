import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor() { }

  
  public getPatientInfo(){
    return JSON.parse(localStorage['allInfo'])
  }
};
