import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate, state} from '@angular/animations';
import { MatDialog, ErrorStateMatcher } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { NgModel} from '@angular/forms'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { PostsService } from '../posts.service'
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
 
  constructor(public dialog: MatDialog,private route: ActivatedRoute,private post:PostsService) { }

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
    if(this.CategoriaId!=null)
    {
      this.post.getPostsByCategoriesId(this.CategoriaId).subscribe(
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

  isPosts(){
    //console.log('cargando posts',this.loadingPosts);
    return this.loadingPosts;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
          this.post.addPost(dialogRef.componentInstance.title.value,
          dialogRef.componentInstance.descr.value,
          dialogRef.componentInstance.url_img.value,
          this.CategoriaId,
          '1',
          '2018-11-16',
          '2018-11-16',
          dialogRef.componentInstance.content.value,
          dialogRef.componentInstance.price.value
          ).subscribe(data => {
          this.res = data.message;
          console.log('info=',this.res);
        });
      

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

  constructor() { }

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
  public content = new FormControl('', this.commonValidation);

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
  }

  validando(){
    this.title.setValue(this.title.value.trim());
    this.descr.setValue(this.descr.value.trim());
    this.url_img.setValue(this.url_img.value.trim());
    this.price.setValue(this.price.value.trim());
    this.content.setValue(this.content.value.trim());



    //Titulo
    if(!this.title.hasError('minlength') && !this.title.hasError('required') && !this.title.hasError('whitespace')&& !this.title.hasError('pattern'))
    {
      this.titleValid = true;
     // console.log('Titulo es valido...',!this.title.hasError('minlength'), !this.title.hasError('required'), !this.title.hasError('whitespace'));
    }else{
      this.titleValid = false;
     // console.log('Titulo NO es valido...',!this.title.hasError('minlength'), !this.title.hasError('required'), !this.title.hasError('whitespace'));
    }
    //Descripcion
    if(!this.descr.hasError('minlength') && !this.descr.hasError('required') && !this.descr.hasError('whitespace')&& !this.descr.hasError('pattern'))
    {
      this.descrValid = true;
     // console.log('Descr es valido...');
    }else{
      this.descrValid = false;
     // console.log('Descr NO es valido...');
    }
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
    if(!this.price.hasError('minlength') && !this.price.hasError('required') && !this.price.hasError('whitespace')&& !this.price.hasError('pattern'))
    {
      this.priceValid = true;
      //console.log('price es valido...');
    }else{
      this.priceValid = false;
     // console.log('price NO es valido...');
    }
    //Contenido
    if(!this.content.hasError('minlength') && !this.content.hasError('required') && !this.content.hasError('whitespace')&& !this.content.hasError('pattern'))
    {
      this.contentValid = true;
     // console.log('content es valido...');
    }else{
      this.contentValid = false;
     // console.log('content NO es valido...');
    }


    if (this.priceValid && this.url_imgValid && this.descrValid && this.titleValid && this.contentValid)
    {
      this.valido = true;
    }else{
      this.valido = false;
    }

  }


  matcher = new MyErrorStateMatcher();

}
