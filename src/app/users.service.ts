import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './models/User';
import { HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';

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
api = '';
  constructor(private http:HttpClient) { }

  addUser(user:User){
    let now = new Date();
    user.created_date = formatDate(now, 'yyyy-MM-dd H:mm:ss', 'en-US');
    user.modified_date = formatDate(now, 'yyyy-MM-dd H:mm:ss', 'en-US');

    return this.http.post<myData>('/API/Users/register',user,httpOptions);
  }

  getUserInfo(token){
    let httpOptionsToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    if(token)
    { 
      httpOptionsToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization':'Bearer '+token
      })
    };
    }

    return this.http.post<datos>(this.api+'/API/Users/getUserInfo',{},httpOptionsToken);
  }
  
  getUser(token,users_id){
    let httpOptionsToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization':'Bearer '+token
      })
    };
    return this.http.post<datos>(this.api+'/API/Users/getUserInf',{users_id},httpOptionsToken);
  }


  editUser(user:User,token){
    let httpOptionsToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization':'Bearer '+token
      })
    };
    let now = Date();
   
    user.modified_date = formatDate(now, 'yyyy-MM-dd H:mm:ss', 'en-US', '-8000');
    return this.http.post<myData>(this.api+'/API/Users/editUser',user,httpOptionsToken);
  }

  uploadProfilePicture(picture: File,token){
    let httpOptionsToken = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization':'Bearer '+token
      })
    };
    //let now = Date();
    const uploadData = new FormData();
    uploadData.append('picture', picture, picture.name);

    return this.http.post<myData>(this.api+'/API/Users/uploadProfilePicture',uploadData,httpOptionsToken);
  }

  //Users/GetVendedores

  getVendedores(token){
    let httpOptionsToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization':'Bearer '+token
      })
    };
    return this.http.get<myData>(this.api+'/API/Users/GetVendedores',httpOptionsToken);
  }

  sendEmail(email){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post<myData>(this.api+'/API/Users/searchEmail',{email},httpOptions);
  }

  sendFeedback(comment,asunto,token){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization':'Bearer '+token
      })
    };
    return this.http.post<myData>(this.api+'/API/Users/sendFeedback',{comment,asunto},httpOptions);
  }

  resetPassword(newpassword,token){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post<myData>(this.api+'/API/Users/reset',{newpassword,token},httpOptions);
  }

  saveRating(evaluado_id,comentarios,created_date,rating,token){
    let httpOptionsToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization':'Bearer '+token
      })
    };
    return this.http.post<myData>(this.api+'/API/Users/saveRating',{evaluado_id,comentarios,rating,created_date},httpOptionsToken);
  }


  activate(token:String){

    return this.http.post<myData>(this.api+'/API/Users/activacion?id='+token,null,httpOptions);
  }

  getUsersAdmon(token){
    let httpOptionsToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Accept': 'application/json',
          'Authorization':'Bearer '+token
        })
      };
    
   
    return this.http.get<myData>(this.api+'/API/Users/GetUsers',httpOptionsToken);
  }

  changeUserStatus(users_id,new_status,token){
    let httpOptionsToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Accept': 'application/json',
          'Authorization':'Bearer '+token
        })
      };

    return this.http.post<myData>(this.api+'/API/Users/changeUserStatus',{users_id,new_status},httpOptionsToken);
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

interface datos {
  success: boolean,
  data:Object
}

