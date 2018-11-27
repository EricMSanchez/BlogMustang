import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  myStyle: SafeHtml;
  constructor(
    private route: ActivatedRoute,
    private post:PostsService,
    private router: Router,
    private _sanitizer: DomSanitizer) { 
     }

     id = '';
     title = '';
     image_url = '';
     body = '';
     category = '';
     categoryId = '';
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('posts_id');
    this.title = this.route.snapshot.paramMap.get('title');
    this.image_url = this.route.snapshot.paramMap.get('image_url');
    this.body = this.route.snapshot.paramMap.get('body');
    this.category = this.route.snapshot.paramMap.get('category');
    this.categoryId = this.route.snapshot.paramMap.get('cat_id');
    this.myStyle =
      this._sanitizer.bypassSecurityTrustHtml(this.body);

  }

  toCategory(){
    this.router.navigate(['/posts',{"id":this.categoryId,"titulo":this.category}], { skipLocationChange: true });

  }

}
