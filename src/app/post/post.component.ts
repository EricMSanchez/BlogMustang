import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgModel,NgForm, FormGroupDirective, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { formatDate } from '@angular/common';
import { HeaderComponent } from '../header/header.component'
import { Subscription } from 'rxjs';
import { EventEmiterService } from '../event-emiter.service';
import { User } from '../models/User';
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


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
  owner_id;
  body_aux;
  constructor(private _eventEmiter: EventEmiterService,
    private route: ActivatedRoute,
    private post:PostsService,
    private router: Router,
    public dialog: MatDialog,
    private _sanitizer: DomSanitizer,
    private auth:AuthService) { 
     }

     id = '';
     title = '';
     image_url = '';
     body = '';
     category = '';
     categoryId = '';
     price = '';
     posts_id = '';

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

  openDialog() {
    
    const dialogRef = this.dialog.open(DialogContentD,{data:
      {
        category_id:this.categoryId,
        title:this.title,
        price:this.price,
        url_img:this.image_url,
        content:this.body_aux
      }});
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let now = new Date();
        console.log(); 

          this.post.savePost(this.id,
          dialogRef.componentInstance.title.value,
          dialogRef.componentInstance.url_img.value,
          dialogRef.componentInstance.content,
          dialogRef.componentInstance.price.value,
          this.auth.getUser().token
          ).subscribe(data => {
          //this.res = data.message;
          this.getPost();
          //console.log('info=',this.res);
        });

        //this.router.navigate(['/posts',{"id":this.CategoriaId,"titulo":this.titulo}], { skipLocationChange: true });
       
      }else{
        console.log('No se guarda');
      }
    },err=>{
      console.log('Problem ',err);
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

  isPostOwner(){
    return (this.auth.getUser().nouser == this.owner_id)
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
          this.body_aux = data.posts[0].body;
          this.price = data.posts[0].price;
          this.category = data.posts[0]['categories'].title;
          this.owner_id = data.posts[0]['users'].users_id;
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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'dialog-content-dialog',
  templateUrl: 'dialog-content-dialog.html',
})

export class DialogContentD {
  editorConfig =null;
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
//"imageEndPoint": "api/API/posts/uploadImage.json",
/* Solo activar cuando se tenga que subir una imagen para los post... */
    this.category_id = data.category_id;


    this.editorConfig = {
      "editable": true,
      "spellcheck": true,
      "height": "20em",
      "minHeight": "0",
      "width": "auto",
      "minWidth": "0",
      "translate": "yes",
      "enableToolbar": true,
      "showToolbar": true,
      "placeholder": "Ingresa el texto aqui...",
      "imageEndPoint": "",
      "toolbar": [
          ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
          ["fontName", "fontSize", "color"],
          ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
          ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
          ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
          ["link", "unlink", "image"]
      ]
  }
   }

  public category_id;



  commonValidation = [
    Validators.required
    ,Validators.minLength(6)
    ,Validators.pattern('[a-zA-ZáóíéúñÁÉÍÓÚÑ 0-9/,.-_]*')
    ,this.noWhitespaceValidator
  ];
  urlValidation = [
    Validators.required
    ,Validators.minLength(6)
    ,Validators.pattern("https?://.+")
    ,this.noWhitespaceValidator
  ];
  priceValidation = [
    Validators.required
    ,Validators.minLength(1)
    ,Validators.pattern('[0-9.]*')
  ];


  public title = new FormControl('', this.commonValidation);
  public descr = new FormControl('', this.commonValidation);
  public url_img = new FormControl('',this.urlValidation);
  public price = new FormControl('',this.priceValidation);
  public content; //new FormControl('', this.commonValidation);

  titleValid = false;
  descrValid = false;
  url_imgValid = false;
  priceValid = false;
  contentValid = false;

  public valido:boolean;

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
   
    return isValid ? null : { 'whitespace': true };
}

  ngOnInit() {
    this.valido = false;
    this.title.setValue(this.data.title)
    this.url_img.setValue(this.data.url_img);
    this.price.setValue(this.data.price);
    this.content=this.data.content;
    this.validando();
    //this.contentValid = ;
  }

  validando(){
    this.title.setValue(this.title.value.trim());
    this.descr.setValue(this.descr.value.trim());
    this.url_img.setValue(this.url_img.value.trim());
    this.price.setValue(this.price.value);
    //this.content.setValue(this.content.value.trim());



    //Titulo
    if(!this.title.hasError('minlength') && !this.title.hasError('required') && !this.title.hasError('whitespace')&& !this.title.hasError('pattern'))
    {
      this.titleValid = true;
     // console.log('Titulo es valido...',!this.title.hasError('minlength'), !this.title.hasError('required'), !this.title.hasError('whitespace'));
    }else{
      this.titleValid = false;
     // console.log('Titulo NO es valido...',!this.title.hasError('minlength'), !this.title.hasError('required'), !this.title.hasError('whitespace'));
    }
    /* SE QUITO A PETICION DEL CLIENTE
    //Descripcion
    if(!this.descr.hasError('minlength') && !this.descr.hasError('required') && !this.descr.hasError('whitespace')&& !this.descr.hasError('pattern'))
    {
      this.descrValid = true;
     // console.log('Descr es valido...');
    }else{
      this.descrValid = false;
     // console.log('Descr NO es valido...');
    }*/
    //URL de Imagen
    if(!this.url_img.hasError('minlength') && !this.url_img.hasError('required') && !this.url_img.hasError('whitespace')&& !this.url_img.hasError('pattern'))
    {
      this.url_imgValid = true;
     // console.log('url_img es valido...');
    }else{
      this.url_imgValid = false;
     // console.log('url_img NO es valido...');
    }
    //Precio
    if((this.category_id != 2) || !this.price.hasError('minlength') && !this.price.hasError('required') && !this.price.hasError('pattern'))
    {
      this.priceValid = true;
     // console.log('price es valido...');
    }else{
      this.priceValid = false;
      //console.log('price NO es valido...');
    }
    //Contenido
    if(this.content != null)
    {
      this.contentValid = true;
     // console.log('CONTENIDO:',this.content);
    }else{
      this.contentValid = false;
      //console.log('content NO es valido...');
    }

//&& this.descrValid
    if (this.priceValid && this.url_imgValid  && this.titleValid)
    {
      this.valido = true;
    }else{
      this.valido = false;
    }

  }

  
  matcher = new MyErrorStateMatcher();
  
}
