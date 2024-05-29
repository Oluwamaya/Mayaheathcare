import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocServiceService {

  constructor() { }
  public getDocInfo(){
    return JSON.parse(localStorage['docInfo'])
  }
}
