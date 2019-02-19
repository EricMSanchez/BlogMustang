import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgModel,NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';
import { formatDate } from '@angular/common';
import { HeaderComponent } from '../header/header.component'
import { Subscription } from 'rxjs';
import { EventEmiterService } from '../event-emiter.service';
import { User } from '../models/User';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Output() openLoginWin = new EventEmitter();
  sub: Subscription;
  myStyle: SafeHtml;
  comments = null;
  message:string;
  user:User;
  constructor(private _eventEmiter: EventEmiterService,
    private route: ActivatedRoute,
    private post:PostsService,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private auth:AuthService) { 
     }

     id = '';
     title = '';
     image_url = '';
     body = '';
     category = '';
     categoryId = '';

  ngOnInit() {
    this.user = new User();
    this.setUserData();
    //this.updateUser();

    this.id = this.route.snapshot.paramMap.get('posts_id');
    this.categoryId = this.route.snapshot.paramMap.get('cat_id');

   this.getPost();
    //console.log('',this.body);
    this.comments = null;
    if(this.isLoggedIn())
    {
      this.getComments(this.id);
    }else{
      this.comments = null;
    }
    
  }

  updateUser(){
    this.sub = this.route.data
    .subscribe(v => {
        this._eventEmiter.callUserLoggedInfo(true);
     });
  }

  setUserData() {
    this._eventEmiter.userData.subscribe(data => {
      if(data)
      {
       this.user = data;
       this.getPost();
      }
    })
  }

  toUser(users_id){
    this.router.navigate(['/usuario',{"id":users_id}], { skipLocationChange: false });
  }

  openLogin(){
    this.sub = this.route.data
    .subscribe(v => {
        this._eventEmiter.sendMessage(true);

     });
  }

  addComment(){
    let now = new Date();

    this.post.addComment(
      '',
      this.message,
      this.id,
      '0',
      '0',
      '0',
      formatDate(now, 'yyyy-MM-dd H:mm:ss', 'en-US', '+0000'),
      formatDate(now, 'yyyy-MM-dd H:mm:ss', 'en-US', '+0000'),
      this.auth.getUser().token
      ).subscribe(data => {
        if(data.success){
          
          //console.log('Se agrego comentario!');
          this.message = '';
          this.getComments(this.id);
        }else{
          alert('Ocurrio un error al intentar agregar el cometnario, favor de contactar al administrador de la pagina.');
          //console.log('Ocurrio un error');
        }
      });

    
  }

  toCategory(){
    this.router.navigate(['/posts',{"id":this.categoryId,"titulo":this.category}], { skipLocationChange: true });

  }

  getPost(){
    this.post.getPost(this.id,this.categoryId,this.auth.getUser().token).subscribe(data => {
      if(data.success)
      {
        if(data.posts!=null)
        {
          //console.log(data)
          this.title = data.posts[0].title;
          this.image_url = data.posts[0].image_url;
          this.body = data.posts[0].body;
          this.category = data.posts[0]['categories'].title;
          if(this.body)
          {
            this.body = this.body.replace('<img ', '<img class="img-fluid" ');
            this.myStyle =
            this._sanitizer.bypassSecurityTrustHtml(this.body);
          }
        }
        
        //console.log('b',this.body);
      }else{
        console.log('Error');
      }
    });
  }

  getUsername(){
    return this.auth.getUser().username;
  }

  getPhotoUrl(){
    return this.auth.getUser().photo_url;
  }

  isLoggedIn(){
    return this.auth.isLoggedIn;
  }

  getComments(id){
    //,this.auth.getUser().token
    this.post.getCommentsById(id).subscribe(data => {
      if(data.success){
        //console.log('commets',data.comments);''
        if(data.comments['length']>0)
        {
          this.comments = data.comments;
        }else{
          this.comments = null;
        }
      }else{
        //console.log('Error:',data.comments);
        this.comments = null;
      }
    });
  }

}
