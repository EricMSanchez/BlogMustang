import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './models/User';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  addUser(user:User){

    return this.http.post<myData>('/api/BlogAPI/Users/register',user,httpOptions);
  }

}
interface myData {
  message: Object,
  success: boolean,
  users: Object,
  data:Object,
  error:{
    data:{
      errors:{
        email: {_isUnique: String},
        username: {_isUnique: String},
      }
    }
  }
}

interface Usuario{
    username:String;
    email:String;
    password:String;
    name:String;
    photo_url:String;
    privileges_privilege_id:String;
    rating:String;
    active:String;
    calle:String;
    colonia:String;
    numeroExt:String;
    pais:String;
    estado:String;
    ciudad:String;
    tel:String;
}