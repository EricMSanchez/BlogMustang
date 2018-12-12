import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

export interface DialogData {
 // animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private router:Router) { }
  hide = true;
  ngOnInit() {
  }
  
  instrucciones = "Favor de ingresar su usuario y contraseña";
  mensaje = "Si aun no te encuentras registrado te invitamos\n a registrarte haciendo click en el boton de registro.";


  toRegistro(){
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

logIn(){
  alert('Usuario: '+this.user.value+' Password:'+this.password.value);
}

  
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}