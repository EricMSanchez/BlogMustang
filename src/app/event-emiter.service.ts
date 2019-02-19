import { Injectable, EventEmitter } from '@angular/core';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class EventEmiterService {

  dataStr = new EventEmitter();
  userData = new EventEmitter();
  uData = new EventEmitter();
  categoriesEmitter = new EventEmitter();
  editMsgAdminEmitter = new EventEmitter();



  constructor() { }

  sendMessage(data: boolean) {
    this.dataStr.emit(data);
  }

  setUserLoggedInfo(data:User){
    this.userData.emit(data);
  }
  

  callUserLoggedInfo(data:boolean){
    this.uData.emit(data);
  }

  callCategoriesUpdate(){
    this.categoriesEmitter.emit(true);
    //this.editMsgAdminEmitter.emit(true);
  }

}
