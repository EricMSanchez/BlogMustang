import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroupDirective, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { DialogContentComponent } from '../dialog-content/dialog-content.component'
import { UsersService } from '../users.service'
import { User } from '../models/User'


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form: any;

  emailValido = true;
  usuarioValido = true;
  passwordsMatcher = new RepeatPasswordEStateMatcher;
  tmp = '1234567689123456789123456789';
  tmp2 = '1234567689123456789123456789';
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,private users:UsersService) {
    this.emailValido = true;
  this.usuarioValido = true;
    this.form = this.formBuilder.group ( {
      password : new FormControl('', PasswordValidation)
      ,passwordConfirm : new FormControl('')
      ,nombre : new FormControl('', this.commonValidation)
      ,apellido : new FormControl('', this.commonValidation)
      ,usuario : new FormControl('', this.userValidation)
      ,email : new FormControl('', [Validators.required, Validators.email,Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),this.emailExiste.bind(this)])
      ,calle : new FormControl('', this.direccionValidation)
      ,colonia : new FormControl('', this.direccionValidation)
      ,pais : new FormControl('', this.requiredValidation)
      ,estado : new FormControl('', this.requiredValidation)
      ,ciudad : new FormControl('', this.requiredValidation)
      ,numeroExt : new FormControl('', this.numberValidation)
      ,acceptTerms: new FormControl('', [Validators.requiredTrue])
    }, { validator: RepeatPasswordValidator });
  
   }

  ngOnInit() {

  }

  staticAlertClosed = true;
  mensaje = '';

  hide = true;
  commonValidation = [
    Validators.required
    ,Validators.pattern('[a-zA-ZáóíéúñÁÉÍÓÚÑ 0-9]*')
    ,this.noWhitespaceValidator
  ];
  requiredValidation = [
    Validators.required
  ];

  userValidation = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(24),
    Validators.pattern('[a-zA-ZñÑ 0-9]*'),
    this.usuarioExiste.bind(this)
  ];
  direccionValidation = [
    Validators.required
    ,Validators.minLength(3)
    ,Validators.pattern('[a-zA-Z, 0-9#]*')
    ,this.noWhitespaceValidator
  ];
  numberValidation = [
    Validators.required
    ,Validators.pattern('[0-9]*')
    ,this.noWhitespaceValidator
  ];
  

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
   
    return isValid ? null : { 'whitespace': true };
}

public usuarioExiste(control: FormControl) {
  const isValid = this.tmp != control.value;
  this.usuarioValido = this.tmp != control.value;
  return isValid ? null : { 'usrValid': true };
}

public emailExiste(control: FormControl) {
  const isValid = (this.tmp2 != control.value);
  this.emailValido = this.tmp2 != control.value;
  return isValid ? null : { 'emailValid': true };
}

getErrorMessage(control :FormControl) {
  //console.log('Email:',control.value);
  return control.hasError('required') ? 'El <b>Email</b> es obligatorio.' :
      control.hasError('email') ? 'Ingrese un <b>Email</b> valido.' :
      control.hasError('pattern') ? 'Ingrese un <b>Email</b> valido.' :
      control.hasError('emailValid')  ? 'El <b>Email</b> ingresado ya esta registrado!' :
          '';
}

openDialog() {

  const dialogRef = this.dialog.open(DialogContentComponent);
  
  dialogRef.afterClosed().subscribe(result => {
    if(result){
      console.log('True');
    }else{
      console.log('False');
    }
  });


}

 saveUsuario(){
  this.emailValido = true;
  this.usuarioValido = true;
  let user = new User();
  user.username = this.form.get('usuario').value;
  user.password = this.form.get('password').value;
  user.name = this.form.get('nombre').value;
  user.email = this.form.get('email').value;
  user.photo_url = ''; //this.form.get('photo_url').value;
  user.privileges_privilege_id = "2";
  user.rating = "0";
  user.active = "0";
  user.calle = this.form.get('calle').value;
  user.colonia = this.form.get('colonia').value;
  user.numeroExt = this.form.get('numeroExt').value;
  user.pais = this.form.get('pais').value;
  user.estado = this.form.get('estado').value;
  user.ciudad = this.form.get('ciudad').value;
  user.tel = ''; //this.form.tel.value;//aun no implementado
  this.mensaje = '';
  this.staticAlertClosed = true;
  this.tmp = this.tmp2 = '1234567689123456789123456789';
  this.users.addUser(user).subscribe(response => { 

    if(response.success){
      this.openDialog(); 
    }else{

    }
   
  },
  err => {
      //handle errors here
      if(err.error.data.errors.email && err.error.data.errors.username){
      //alert('Error:\n - '+err.error.data.errors.email._isUnique+'\n'+' - '+err.error.data.errors.username._isUnique);
      this.emailValido = this.usuarioValido = false;

      this.tmp = this.form.get('usuario').value;
      this.form.get('usuario').setValue('');
      this.form.get('usuario').setValue(this.tmp);

      this.tmp2 = this.form.get('email').value;
      this.form.get('email').setValue('');
      this.form.get('email').setValue(this.tmp2);

      this.staticAlertClosed = false;
      this.mensaje = 'El <b>Email</b> y el <b>Usuario</b> ya se encuentran registrados.';
    }else if(err.error.data.errors.username){
        //alert('Error:\n'+err.error.data.errors.username._isUnique);
        this.tmp = this.form.get('usuario').value;
        this.form.get('usuario').setValue('');
        this.form.get('usuario').setValue(this.tmp);

        this.usuarioValido = false;
        this.staticAlertClosed = false;
        this.mensaje = 'El <b>Usuario</b> ya se encuentra registrado.';
        
      }else if(err.error.data.errors.email){
        //alert('Error:\n'+err.error.data.errors.email._isUnique);
        this.tmp2 = this.form.get('email').value;
        this.form.get('email').setValue('');
        this.form.get('email').setValue(this.tmp2);

        this.emailValido = false;
        this.mensaje = 'El <b>Email</b> ya se encuentra registrado.';
        this.staticAlertClosed = false;
      }

  });

}


/* validateSamePassword(){
const isSamePass = (this.password.value === this.passwordConfirm.value);
return isSamePass;
}*/

}

export const PasswordValidation = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(24),
  Validators.pattern('[a-zA-ZáóíéúñÁÉÍÓÚÑ 0-9]*'),
];

export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get('password').value !== control.parent.get('passwordConfirm').value && control.dirty)
  }
}
export function RepeatPasswordValidator(group: FormGroup) {
  let password = group.controls.password.value;
  let passwordConfirmation = group.controls.passwordConfirm.value;

  return password === passwordConfirmation ? null : { passwordsNotEqual: true }     
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

