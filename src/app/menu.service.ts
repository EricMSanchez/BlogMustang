import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface myData {
  message: Object,
  success: boolean,
  categories: Object
}

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<myData>('api/BlogAPI/Categories/getCategories.json');
  }

}
