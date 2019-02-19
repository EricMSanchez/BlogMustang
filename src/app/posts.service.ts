import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface myData {
  message: Object,
  success: boolean,
  posts: Object,
  comments: Object
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  api = '';
  constructor(private http:HttpClient) { }

  addPost(title,
    description,
    image_url,
    categories_categories_id,
    users_users_id,
    created_date,
    modified_date,
    body,
    price,
    token){
      let httpOptionsToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Accept': 'application/json',
          'Authorization':'Bearer '+token
        })
      };
      var posts_id = "";
      var status = 'Open';
    return this.http.post<myData>(this.api+'/API/Posts/add.json',{posts_id,title,description,image_url,categories_categories_id,users_users_id,created_date,modified_date,body,price,status},httpOptionsToken);
  }

  getPostsByCategoriesId(categories_id,token){
    let httpOptionsToken = {
      headers: new HttpHeaders({
        
      })
    };
    if(token)
    {
      httpOptionsToken = {
        headers: new HttpHeaders({
          'Authorization':'Bearer '+token
        })
      };
    }
   
    return this.http.post<myData>(this.api+'/API/Posts/GetPostsByCategory.json',{categories_id},httpOptionsToken);
  }

  getCommentsById(posts_id){
    return this.http.post<myData>(this.api+'/API/Commentaries/GetComments.json',{posts_id});
  }

  addComment(subject,mesage,posts_posts_id,users_users_id,rating,cometaries_reply_id,created_date,modified_date,token){
    let httpOptionsToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization':'Bearer '+token
      })
    };
    return this.http.post<myData>(this.api+'/API/Commentaries/add',{subject,mesage,posts_posts_id,users_users_id,rating,cometaries_reply_id,created_date,modified_date},httpOptionsToken);
  }

  getPost(posts_id,categories_id,token){
    let httpOptionsToken = {
      headers: new HttpHeaders({
        
      })
    };
    if(token)
    {
      httpOptionsToken = {
        headers: new HttpHeaders({
          'Authorization':'Bearer '+token
        })
      };
    }
   
    return this.http.post<myData>(this.api+'/API/Posts/GetPost.json',{posts_id,categories_id},httpOptionsToken);
  }

  getPostsAdmon(token){
    let httpOptionsToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Accept': 'application/json',
          'Authorization':'Bearer '+token
        })
      };
    
   
    return this.http.get<myData>(this.api+'/API/Posts/GetPosts',httpOptionsToken);
  }

  changePostStatus(posts_id,new_status,token){
    let httpOptionsToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Accept': 'application/json',
          'Authorization':'Bearer '+token
        })
      };

    return this.http.post<myData>(this.api+'/API/Posts/changePostStatus',{posts_id,new_status},httpOptionsToken);
  }

}
