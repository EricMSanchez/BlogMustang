import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { Router, ActivatedRoute } from '@angular/router'
import { AuthService, Usuario } from '../auth.service'
import { UsersService } from '../users.service'
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { User } from '../models/User';
import { EventEmiterService } from '../event-emiter.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
editorConfig = null;

editable = false;
id:String;
showBtn = false;

avisoAdministrador = ``;
  constructor(
    private _eventEmiter: EventEmiterService,
    private route:ActivatedRoute,public dialog: MatDialog,
    private router: Router,private auth:AuthService,
    private users:UsersService,
    private menu:MenuService) 
    {
      this.id = "0";
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
            ["bold", "italic", "underline"],
            ["fontName", "fontSize", "color"],
            ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"]
           
        ]
    }
     }

  msj = '';
  sub: Subscription;
  
  setDataStr() {
    this._eventEmiter.dataStr.subscribe(data => {
      if(data)
      {
        this.openDialog();
      }
    })
  }

  /*setNotificationEmiter(){
    this._eventEmiter.editMsgAdminEmitter.subscribe(data => {
      if(data)
      {
        if(!this.auth.isLoggedIn)
        {
          this.showBtn = false;
        }
      }
    })
  }
*/
  uptUser(){
    this.sub = this.route.data
    .subscribe(v => {
        this._eventEmiter.setUserLoggedInfo(this.user);
     });
  }

  setUserData() {
    this._eventEmiter.uData.subscribe(data => {
      if(data)
      {
       this.uptUser();
      }
    })
  }


  user:any;
  private _success = new Subject<string>();
 
  
  staticAlertClosed = false;
  successMessage: string;
  type = '';

  updateCategories(){
    this.sub = this.route.data
    .subscribe(v => {
        this._eventEmiter.callCategoriesUpdate();
     });
  }


  ngOnInit() {
    this.user = new User();
   
    this.setDataStr();
    this.getUsuario();
    this.getMainNotice();
    //this.setNotificationEmiter();
    //this.user.token = '';

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }

  public changeSuccessMessage() {
    this._success.next(`Bienvenido al foro TodoMustangMx!`);
  }

  public changeErrorMessage() {
    this._success.next(`El usuario o contraseña son incorrectos.`);
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      if(!dialogRef.componentInstance.mostrar){
        this.type = 'success';
        this.changeSuccessMessage();
        this.getUsuario();
      }else{
        
        if(dialogRef.componentInstance.error)
        {
          this.type = 'danger';
          this.changeErrorMessage();
        }
        
      }
    });

  }

  toRegistro(){
    this.router.navigate(['/registro',{}], { skipLocationChange: false });
  }
  toContacto(){
    this.router.navigate(['/contacto',{}], { skipLocationChange: false });
  }

  closeSesion(){
   this.auth.setLoggedIn(false);
   this.updateCategories();
  }

  isLoggedIn(){
    return this.auth.isLoggedIn;
  }

  getUsuario(){
    this.users.getUserInfo(this.auth.getUser().token).subscribe(data => {
      if(data.success){
        this.user = data.data;
        this.setUserData();
        if(this.user['privileges_privilege_id'] == 1)
        {
          this.showBtn = true;
        }else{
          this.showBtn = false;
        }

      }
    },err =>{
      //console.log('error');
    });

  }

  editNotice(aviso){
    if(this.editable)
    {
      this.saveNotice();
    }

    this.editable = !aviso;
  }

  saveNotice(){
    console.log('id=',this.id);
    this.menu.saveMainNotice(this.id,this.avisoAdministrador,this.auth.getUser().token).subscribe(data => {
      if(data.success)
      {
        //console.log('d',data.data);
      }
    },err=>{
      console.log(err.data)
    });
  }

  getMainNotice(){
    this.menu.getMainNotice().subscribe(data => {
      if(data.success)
      {
        if(data.data)
        {
          this.avisoAdministrador = data.data[0]['anuncio'];
          if(data.data[0]['id'])
          {
            this.id = data.data[0]['id'];
          }
        }
      }
    },err=>{
      console.log(err.data)
    });
  }


}


