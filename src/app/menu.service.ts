import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface myData {
  message: Object,
  success: boolean,
  categories: Object,
  data:Object
}

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  api = '';
  

  constructor(private http:HttpClient) { }

  getActiveCategories(token:String){
    let httpOptionsToken =  {
      headers: new HttpHeaders({
      })
    };
    if(token != null){
      httpOptionsToken =  {
        headers: new HttpHeaders({
          'Authorization':'Bearer '+token
        })
      };
    }
   
    return this.http.get<myData>(this.api+'/API/Categories/GetActiveCategories.json',httpOptionsToken);
  }

  getCategories(token:String){
    let httpOptionsToken =  {
      headers: new HttpHeaders({
      })
    };
    if(token != null){
      httpOptionsToken =  {
        headers: new HttpHeaders({
          'Authorization':'Bearer '+token
        })
      };
    }
   
    return this.http.get<myData>(this.api+'/API/Categories/GetCategories.json',httpOptionsToken);
  }

  getMainNotice(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
   
    return this.http.get<myData>(this.api+'/API/Anuncios/getMainNotice',httpOptions);
  }

  saveMainNotice(id_aviso,aviso,token){
    let httpOptionsToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization':'Bearer '+token
      })
    };
   
    return this.http.post<myData>(this.api+'/API/Anuncios/saveMainNotice',{id_aviso,aviso},httpOptionsToken);
  }

  saveCategories(token:String,category : FormData){
    let httpOptionsToken = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization':'Bearer '+token
      })
    };
   
    return this.http.post<myData>(this.api+'/API/Categories/saveCategory',category,httpOptionsToken);
  }

  uploadCategoryImage(token:String,picture : File,category_id){
    let httpOptionsToken = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization':'Bearer '+token
      })
    };
    //let now = Date();
    const uploadData = new FormData();
    uploadData.append('picture', picture, picture.name);
    uploadData.append('category_id', category_id);

    return this.http.post<myData>(this.api+'/API/Categories/uploadCategoryImage',uploadData,httpOptionsToken);
  }

}
