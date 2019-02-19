import { Component, OnInit } from '@angular/core';
import { RepeatPasswordEStateMatcher, RepeatPasswordValidator, PasswordValidation } from '../registro/registro.component';
import { NgModel,NgForm,FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  passwordsMatcher = new RepeatPasswordEStateMatcher;
  
  private _success = new Subject<string>();
  
  staticAlertClosed = false;
  successMessage: string;
  type = '';
  load = false;

  form:any;
  hide = true;
  token = '';

  error = false;

  existeToken = false;

  constructor(private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder,private users:UsersService) {
    this.form = this.formBuilder.group ( {
      password : new FormControl('', PasswordValidation)
      ,passwordConfirm : new FormControl('',PasswordValidation)
    }, { validator: RepeatPasswordValidator });
    console.log('',this.existeToken)
   }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
      
      
    ).subscribe(data => {
      if(!this.error)
      {
        this.router.navigate(['/'], { skipLocationChange: false });
      }
    },() => this.successMessage = null);
    this.route.queryParams.subscribe(params => {
      if(params['id'])
      {
        this.token = params['id'];
      }
      if(this.token.toString().trim() != '')
      {
        this.existeToken = true;
      }

  });

  }


  
  public changeSuccessMessage() {
    this.type = 'success';
    this._success.next(`Se ha cambiado el password correctamente.`);
  }

  public changeWarningMessage(msg) {
    this.type = 'warning';
    this._success.next(msg);
  }

  public changeErrorMessage(msg,type) {
    this.type = type;
    this._success.next(msg);
  }


  savePassword(){
    this.users.resetPassword(this.form.get('password').value,this.token).subscribe(data=>{
      if(data.success){

          this.changeSuccessMessage();
        
       // debounceTime(6000);
       this.error = false;
        //console.log('1');
      }else{
        this.changeErrorMessage(`Ocurrio un problema, favor de intentar de nuevo`,'danger');
        //console.log('2');'
        this.error = true;
      }
    },
    err => {
      this.changeErrorMessage(`Ocurrio un problema, favor de intentar de nuevo.`,'danger');
      //console.log('3');
      this.error = true;
    });
  }



    


}
