import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-admon-posts',
  templateUrl: './admon-posts.component.html',
  styleUrls: ['./admon-posts.component.css']
})
export class AdmonPostsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private post:PostsService,
    private auth:AuthService,
    private router: Router
    ) { }

  public CategoriaId;
  public titulo;
  posts = null;
  msj = '';
  loading = true;
  //apiposts = null;
  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');
    let title = this.route.snapshot.paramMap.get('titulo');
    this.CategoriaId = id;
    this.titulo = title;
    this.getPosts();

  }

  getPosts(){
    this.post.getPostsAdmon(this.auth.getUser().token).subscribe(data => {
      if(data.success)
      {
        this.posts = data.posts;
        //console.log('posts',this.posts);
      }
    },err => {

    });
  }


  changePostStatus(posts_id,new_status){
    this.post.changePostStatus(posts_id,new_status,this.auth.getUser().token).subscribe(data => {
      if(data.success)
      {
        this.getPosts();
        //console.log('posts',this.posts);
      }
    },err => {

    });
  }

  

}
