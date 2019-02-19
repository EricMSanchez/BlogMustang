import { Component, OnInit,Inject } from '@angular/core';
import { trigger,style,transition,animate, state} from '@angular/animations';
import { MatDialog, ErrorStateMatcher } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { NgModel} from '@angular/forms'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { PostsService } from '../posts.service';
import {formatDate } from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from '../auth.service'
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private post:PostsService,
    private router: Router,
    public auth: AuthService) { 

  }




  public CategoriaId;
  public titulo;
  res = null;
  posts = null;
  msj = '';
  loadingPosts = true;
  //apiposts = null;
  ngOnInit() {
    this.posts = null;
    let id = this.route.snapshot.paramMap.get('id');
    let title = this.route.snapshot.paramMap.get('titulo');
    this.CategoriaId = id;
    this.titulo = title;
    this.getPosts();
  }

  isPosts(){
    //console.log('cargando posts',this.loadingPosts);
    return this.loadingPosts;
  }

//"title":title,"image_url":image_url,"body":body,"category":this.titulo,
  toPost(posts_id,title,image_url,body){
    this.router.navigate(['/post',{"posts_id":posts_id,"cat_id":this.CategoriaId}], { skipLocationChange: false });
  }

  toUser(users_id){
    this.router.navigate(['/usuario',{"id":users_id}], { skipLocationChange: false });
  }

  getPosts(){
    if(this.CategoriaId!=null)
        {
          this.post.getPostsByCategoriesId(this.CategoriaId,this.auth.getUser().token).subscribe(
            data =>{
              if(data.posts.toString()!='')
              {
                this.posts = data.posts;
                
                //console.log('Categories_id:'+this.CategoriaId+'POST:',this.posts)
                this.loadingPosts = false;
              }else{
                this.msj = 'No hay Posts en esta categoria...'
                this.loadingPosts = false;
              }
            }
          );
          
        }
  }

  openDialog() {
    
    const dialogRef = this.dialog.open(DialogContentDialog,{data:{category_id:this.CategoriaId}});
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let now = new Date();
        console.log(); 
          this.post.addPost(dialogRef.componentInstance.title.value,
          dialogRef.componentInstance.descr.value,
          dialogRef.componentInstance.url_img.value,
          this.CategoriaId,
          '0',
          formatDate(now, 'yyyy-MM-dd H:mm:ss', 'en-US', '-8000'),
          formatDate(now, 'yyyy-MM-dd H:mm:ss', 'en-US', '-8000'),
          dialogRef.componentInstance.content,
          dialogRef.componentInstance.price.value,
          this.auth.getUser().token
          ).subscribe(data => {
          this.res = data.message;
          this.getPosts();
          console.log('info=',this.res);
        });
        //this.router.navigate(['/posts',{"id":this.CategoriaId,"titulo":this.titulo}], { skipLocationChange: true });
       
      }else{
        console.log('No se guarda');
      }
    });
  }
/*
  openPost(titulo,desc,fecha,user,precio) {
    const dialogRef = this.dialog.open(PostContent);
    dialogRef.componentInstance.titulo = titulo;
    dialogRef.componentInstance.desc = desc;
    dialogRef.componentInstance.fecha = fecha;
    dialogRef.componentInstance.user = user;
    dialogRef.componentInstance.precio = precio;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }*/


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

export class DialogContentDialog {
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
    ,this.noWhitespaceValidator
  ];


  public title = new FormControl('', this.commonValidation);
  public descr = new FormControl('', this.commonValidation);
  public url_img = new FormControl('',this.urlValidation);
  public price = new FormControl('',this.priceValidation);
  content; //new FormControl('', this.commonValidation);

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
    //this.contentValid = ;
  }

  validando(){
    this.title.setValue(this.title.value.trim());
    this.descr.setValue(this.descr.value.trim());
    this.url_img.setValue(this.url_img.value.trim());
    this.price.setValue(this.price.value.trim());
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
    if((this.category_id != 2) || !this.price.hasError('minlength') && !this.price.hasError('required') && !this.price.hasError('whitespace')&& !this.price.hasError('pattern'))
    {
      this.priceValid = true;
      //console.log('price es valido...');
    }else{
      this.priceValid = false;
     // console.log('price NO es valido...');
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
