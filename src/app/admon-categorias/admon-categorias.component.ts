import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { NgModel, FormBuilder} from '@angular/forms'
import { AuthService } from '../auth.service';
import { MenuService } from '../menu.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admon-categorias',
  templateUrl: './admon-categorias.component.html',
  styleUrls: ['./admon-categorias.component.css']
})
export class AdmonCategoriasComponent implements OnInit {
  titulo_category = null;
  descripcion = null;
  image = null;
  active = null;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private menu:MenuService,
    private auth:AuthService,
    private router: Router
    ) { }

  public CategoriaId;
  public titulo;
  categorias = null;
  msj = '';
  loading = true;
  //apiposts = null;
  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');
    let title = this.route.snapshot.paramMap.get('titulo');
    this.CategoriaId = id;
    this.titulo = title;
    this.getCategorias();

  }

  getCategorias(){
    this.menu.getCategories(this.auth.getUser().token).subscribe(data => {
      if(data.success)
      {
        this.categorias = data.categories;
        //console.log('categorias',this.categorias);
      }
    },err => {

    });
  }


  openDialog(title,description,image,category_id,active,privilege_id) {
    
    const dialogRef = this.dialog.open(DialogContent,{data:{title,description,image,category_id,active,privilege_id}});
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let now = new Date();
       // console.log('Se guarda info...',dialogRef.componentInstance.uploadData); 
          
        this.menu.saveCategories(this.auth.getUser().token,dialogRef.componentInstance.uploadData).subscribe(data => {
          if(data.success)
          {
            //console.log('posts',this.posts);
            this.getCategorias();
          }
        },err => {
    
        });
       
      }else{
        console.log('No se guarda');
      }
    });
  }


}

@Component({
  selector: 'dialog-content-dialog',
  templateUrl: 'dialog-content-dialog.html',
  styleUrls: ['./admon-categorias.component.css']
})

export class DialogContent implements OnInit {
  editorConfig =null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder, 
  private menu:MenuService, 
  private auth:AuthService,) {
//"imageEndPoint": "api/API/posts/uploadImage.json",
/* Solo activar cuando se tenga que subir una imagen para los post... */

   }

   loginForm = null;
  
  public uploadData = new FormData();

  public selectedFile: File;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.onUpload();
   
    //console.log('file',this.selectedFile)
  }
  public valido:boolean;
  enableCheck = true;

  ngOnInit() {

    this.loginForm = this.fb.group({
      title: new FormControl(this.data.title,[Validators.required]),
      description: new FormControl(this.data.description,[Validators.required]),
      imagen: new FormControl({value:this.data.image,disabled:true}),
      active: new FormControl(this.data.active),
    });
    if(this.data.privilege_id==1)
    {
      this.enableCheck = false;
    }
    //this.contentValid = ;
  }

  saveChanges(){
    
    this.uploadData.append('imagen', this.loginForm.get('imagen').value);
    this.uploadData.append('titulo', this.loginForm.get('title').value);
    this.uploadData.append('descripcion', this.loginForm.get('description').value);
    this.uploadData.append('active', this.loginForm.get('active').value?'1':'0');
    this.uploadData.append('category_id', this.data.category_id);
    //console.log(this.loginForm.get('active').value);

  }

  onUpload() {
    this.menu.uploadCategoryImage(this.auth.getUser().token,this.selectedFile,this.data.category_id).subscribe(data => {
      this.loginForm.get('imagen').setValue('../API/webroot/img/'+this.selectedFile.name);
    },err => {
      console.log(err);
      this.loginForm.get('imagen').setValue('../API/webroot/img/error.png');
      //this.Photo_url = err.data['photo_url'] + '?' + this.timeStamp;
    });
}



  
}
