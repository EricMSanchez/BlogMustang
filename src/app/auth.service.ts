import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Usuario();
  api ='' ;
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private http:HttpClient) {
    this.user.nouser = '';
    this.user.name = '';
    this.user.username = '';
    this.user.priv = '';
    this.user.token = '';
   }

  setLoggedIn(value: boolean){
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn',this.loggedInStatus);
    if(!value)
    {
      localStorage.removeItem('nouser');
      localStorage.removeItem('username');
      localStorage.removeItem('name');
      localStorage.removeItem('priv');
      localStorage.removeItem('photo_url');
      //localStorage.removeItem('calle');
      //localStorage.removeItem('numeroExt');
      //localStorage.removeItem('pais');
      //localStorage.removeItem('estado');
      //localStorage.removeItem('ciudad');
      //localStorage.removeItem('email');
      localStorage.removeItem('token');
    }
  }

  get isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus);
  }

  getUserDetails(username,password){
    //post these details to API
    return this.http.post<Data>(this.api+'/API/Users/token',{username,password},httpOptions);
  }

  setUserDetails(users_id,username,name,priv,token,photo_url)
  {
    localStorage.setItem('nouser',users_id);
    localStorage.setItem('username',username);
    localStorage.setItem('name',name);
    localStorage.setItem('priv',priv);
    localStorage.setItem('photo_url',photo_url);
    //localStorage.setItem('calle',calle);
    //localStorage.setItem('numeroExt',numeroExt);
    //localStorage.setItem('pais',pais);
    //localStorage.setItem('estado',estado);
    //localStorage.setItem('ciudad',ciudad);
    //localStorage.setItem('email',email);
    localStorage.setItem('token',token);
    
    /*this.user.nouser = users_id;
      this.user.name = name;
      this.user.username = username;
      this.user.priv = priv;

      this.user.calle = calle;
      this.user.numeroExt = priv;
      this.user.pais = pais;
      this.user.estado = estado;
      this.user.ciudad = ciudad;
      this.user.email = email;

      this.user.token = token;*/
  }

  getUser(){
    this.user.nouser = localStorage.getItem('nouser');
    this.user.username = localStorage.getItem('username');
    this.user.name = localStorage.getItem('name');
    this.user.priv = localStorage.getItem('priv');
    this.user.photo_url = localStorage.getItem('photo_url');
    //this.user.calle = localStorage.getItem('calle');
    //this.user.numeroExt = localStorage.getItem('numeroExt');
    //this.user.pais =  localStorage.getItem('pais');
    //this.user.estado = localStorage.getItem('estado');
    //this.user.ciudad = localStorage.getItem('ciudad');
    //this.user.email = localStorage.getItem('email');
    this.user.token = localStorage.getItem('token');
    return this.user;
  }



}
interface Data{
  success: boolean;
  message: String;
  data: object;
}


export class Usuario{
  constructor(){
    
  }
  nouser:String;
  username:String;
  name:String;
  priv:String;
  calle:String;
  numeroExt:String;
  pais:String;
  estado:String;
  ciudad:String;
  email:String;
  token:String;
  photo_url:String;
}