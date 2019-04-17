import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,NgModel,NgForm} from '@angular/forms';
import { AuthService } from '../auth.service'
import { User } from '../models/User';
import { UsersService } from '../users.service';
import { all } from 'q';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  form: FormGroup;
  user = new User();
  constructor(fb: FormBuilder,private auth:AuthService,private users:UsersService,
    private _DomSanitizationService: DomSanitizer) {

    this.form = fb.group({
      name : new FormControl(''),
      hideRequired: false,
      floatLabel: 'auto',
    });
  }
  private _success = new Subject<string>();
  
  staticAlertClosed = false;
  successMessage: string;
  type = '';
  ngOnInit() {
    this.getUsuario();
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }

  public changeSuccessMessage() {
    this.type = 'success';
    this._success.next(`Se guardo la informacion con exito!`);
  }

  public changeErrorMessage() {
    this.type = 'danger';
    this._success.next(`Ocurrio un problema al guardar la informacion`);
  }

  name = true;
  //username = true;
  //email = true;
  calle = true;
  colonia = true;
  numero = true;
  pais = true;
  estado = true;
  ciudad = true;
  tel = true;

  All = true;


  Name = '';
  //username = true;
  //email = true;
  Calle = '';
  Colonia = '';
  Numero = '';
  Pais = '';
  Estado = '';
  Ciudad = '';
  Username = '';
  Email = '';
  Photo_url = '';
  Tel = '';

  isUser = false;

  isEdit = true;
  Button = 'Editar';
  timeStamp = (new Date()).getTime();

  selectedFile: File;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log('file',this.selectedFile)
    this.onUpload();
  }

public setLinkPicture(url: string) {
  
}
  onUpload() {
      this.users.uploadProfilePicture(this.selectedFile,this.auth.getUser().token).subscribe(data => {
        this.Photo_url = null;
        this.timeStamp = (new Date()).getTime();
        this.Photo_url = data.data['photo_url'] + '?' + this.timeStamp;

      },err => {
        console.log(err);
        //this.Photo_url = err.data['photo_url'] + '?' + this.timeStamp;
      });
  }
  enableName(value:boolean){
    //console.log(value)
    this.name = value;
  }
/*
  enableUsername(value){
    this.username = value;
  }

  enableEmail(value){
    this.email = value;
  }
*/
  enableCalle(value){
    this.calle = value;
  }

  enableTel(value){
    this.tel = value;
  }

  enableColonia(value){
    this.colonia = value;
  }

  enableNumero(value){
    this.numero = value;
  }

  enablePais(value){
    this.pais = value;
  }

  enableEstado(value){
    this.estado = value;
  }

  enableCiudad(value){
    this.ciudad = value;
  }

  enableAll(value){
    this.enableName(value);
    this.enableNumero(value);
    this.enableCalle(value);
    this.enableColonia(value);
    this.enablePais(value);
    this.enableCiudad(value);
    this.enableEstado(value);
    this.enableTel(value);

    if(this.isEdit)
    {
      this.Button = 'Guardar';
      this.isEdit = false;
    }else{
      this.saveAll();
    }
    

    this.All = value;
  }

  saveAll(){
    this.isEdit = true;
    this.Button = 'Editar';

    let user = new User();
    user.name = this.Name;
    user.calle = this.Calle;
    user.colonia = this.Colonia;
    user.numeroExt = this.Numero;
    user.ciudad = this.Ciudad;
    user.estado = this.Estado;
    user.pais = this.Pais;
    user.tel = this.Tel;

    this.users.editUser(user,this.auth.getUser().token).subscribe(data => {
      if(data.success)
      {
       // alert('Se guardo la informacion con exito!');
       this.getUsuario();
       this.changeSuccessMessage();
      }else{
        //alert('Error...');
        this.changeErrorMessage();
      }
    });
  }

  getUsuario(){
      this.users.getUserInfo(this.auth.getUser().token).subscribe(data=>{
        this.Name = data.data['name'];
        //console.log(data.data)
        this.Username = data.data['username'];
        this.Email = data.data['email'];
        this.Calle = data.data['calle'];
        this.Numero = data.data['numeroExt'];
        this.Colonia = data.data['colonia'];
        this.Estado = data.data['estado'];
        this.Pais = data.data['pais'];
        this.Ciudad = data.data['ciudad'];
        this.Photo_url = data.data['photo_url'];
        this.Tel  = data.data['tel'];
        this.isUser = true;
      },err => {
        this.isUser = false;
      })
  }

  saveUser(){
    //this.user.id = this.getUsuario().nouser;
  }
  

}
