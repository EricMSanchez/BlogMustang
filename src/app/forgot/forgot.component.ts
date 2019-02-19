import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { UsersService } from '../users.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  private _success = new Subject<string>();
  
  staticAlertClosed = false;
  successMessage: string;
  type = '';
  load = false;

  constructor(private users:UsersService) { }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(9000)
    ).subscribe(() => this.successMessage = null);
  }
  public changeSuccessMessage() {
    this.type = 'success';
    this._success.next(`Se ha enviado el correo con exito, favor de revisar tu bandeja`);
  }

  public changeErrorMessage(msg,type) {
    this.type = type;
    this._success.next(msg);
  }

  public changeWarningMessage(msg) {
    this.type = 'warning';
    this._success.next(msg);
  }

  commonValidation = [
    Validators.required
    ,Validators.minLength(3)
    ,Validators.pattern('[a-zA-Z 0-9]*')
    ,this.noWhitespaceValidator
  ];

  public email = new FormControl('',[Validators.email,Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]);

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
   
    return isValid ? null : { 'whitespace': true };
}

sendEmail(){
  this.load = true;
  if(this.email.value.toString().trim() == '')
  {
    this.load = false;
    this.changeErrorMessage(`Favor de ingresar tu correo`,'warning');
  }else
  {
    this.users.sendEmail(this.email.value).subscribe(data=>{
      if(data.success)
      {
        this.load = false;

        if(data.data['message'] == "NO_ACTIVO")
        {
          let msg = `No has activado tu cuenta(en este caso revisar tu correo) o ha sido bloqueado por un administrador`;
          this.changeWarningMessage(msg);
        }else{
          this.changeSuccessMessage();
        }
      }
    }
    ,err=>{
      this.load = false;
      this.changeErrorMessage(`Ocurrio un problema, no hay registro del email ingresado`,'danger');
    });
  }
  
}

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
