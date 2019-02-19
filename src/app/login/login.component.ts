import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, ErrorStateMatcher, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'
import { Subscription } from 'rxjs';
import { EventEmiterService } from '../event-emiter.service';
import { User } from '../models/User';

export interface DialogData {
 // animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private _eventEmiter: EventEmiterService,private router:Router,private Auth:AuthService
  ,public dialogRef: MatDialogRef<LoginComponent>,private route:ActivatedRoute) { }
  hide = true;
  auser = new User();
  mostrar = true;
  error = false;

  ngOnInit() {
  }
  
  instrucciones = "Favor de ingresar su usuario y contraseña";
  mensaje = "Si aun no te encuentras registrado te invitamos\n a registrarte haciendo click en el boton de registro.";

  toCancelar(){
    this.mostrar = true;
    this.dialogRef.close('');
  }

  toRegistro(){
    this.mostrar = true;
    this.router.navigate(['/registro',{}], { skipLocationChange: true });
  }


  commonValidation = [
    Validators.required
    ,Validators.minLength(3)
    ,Validators.pattern('[a-zA-Z 0-9]*')
    ,this.noWhitespaceValidator
  ];

  public user = new FormControl('', this.commonValidation);
  public password = new FormControl('', this.commonValidation);

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
   
    return isValid ? null : { 'whitespace': true };
}

toForgot(){
  this.dialogRef.close('');
}

keyDownFunction(event) {
  //console.log(event.keyCode)
  if(event.keyCode == 13) {
    //alert('you just clicked enter');

    this.logIn();
    // rest of your code
  }
}
sub: Subscription;

updateCategories(){
  this.sub = this.route.data
  .subscribe(v => {
      this._eventEmiter.callCategoriesUpdate();
   });
}

updateUser(){
  this.sub = this.route.data
  .subscribe(v => {
      this._eventEmiter.setUserLoggedInfo(this.auser);
   });
}



logIn(){
  //alert('Usuario: '+this.user.value+' Password:'+this.password.value);
  
  this.Auth.getUserDetails(this.user.value,this.password.value).subscribe(data => {
    if(data.success)
    {
      this.mostrar = false;
      this.Auth.setLoggedIn(true);
      //console.log(data.message);
      this.Auth.setUserDetails(data.data['nouser'],data.data['username'],data.data['name'],data.data['privilege'],data.data['token'],data.data['photo_url']);

      this.auser.name = data.data['name'];
      this.auser.username = data.data['username'];
      this.auser.id = data.data['users_id'];
      this.auser.photo_url = data.data['photo_url'];
      this.auser.privileges_privilege_id = data.data['privilege_id'];

      if(data.data['privilege_id']==1)
      {
        this.dialogRef.close('');
      }else{
        this.dialogRef.close('');
      }
      this.updateCategories();
      this.updateUser();
      //console.log(false);
    }else{
      
      //console.log(true);
    }
  },error => {
    console.log('error:',error)
    switch(error.status){
      case 401:
      this.error = true;
      this.dialogRef.close('');
      break;
      default:
      this.dialogRef.close('');
      break;

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