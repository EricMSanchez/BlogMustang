import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  message: Object,
  success: boolean,
  posts: Object
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  addPost(title,
    description,
    image_url,
    categories_categories_id,
    users_users_id,
    created_date,
    modified_date,
    body,
    price){
      var posts_id = "";
    return this.http.post<myData>('/api/BlogAPI/Posts/add.json',{posts_id,title,description,image_url,categories_categories_id,users_users_id,created_date,modified_date,body,price});
  }

  getPostsByCategoriesId(categories_id){
    return this.http.post<myData>('/api/BlogAPI/Posts/GetPostsByCategory.json',{categories_id});
  }

}
