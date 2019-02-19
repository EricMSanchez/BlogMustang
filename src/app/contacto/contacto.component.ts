import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(private route: ActivatedRoute,private users:UsersService,private auth:AuthService) { }

  asunto = 'Comentario';

  comment:string='';

  enviando = false;

  private _success = new Subject<string>();
  
  staticAlertClosed = false;
  successMessage: string;
  type = '';

  ngOnInit() {

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }

  public changeSuccessMessage() {
    this.type = 'success';
    this._success.next(`Se envio tu caso con exito! <br>Se atenderá a la brevedad posible.`);
  }

  public changeErrorMessage() {
    this.type = 'danger';
    this._success.next(`Ocurrio un problema al enviar el mensaje`);
  }

  public changeWarningMessage() {
    this.type = 'warning';
    this._success.next(`Favor de seleccionar el <b>Asunto</b> y el <b>comentario/queja/sugerencia</b>.`);
  }

  sendFeedBack(){
    this.enviando = true;
    if(this.comment.toString().trim() != '' && this.asunto != null)
    {
      let now = new Date();
      //this.auth.getUser().token;
      this.users.sendFeedback(this.comment,this.asunto,this.auth.getUser().token).subscribe(data => {
        if(data.success)
        {
          this.changeSuccessMessage();
          this.enviando = false;//ended
        }
      },err => {
        this.changeErrorMessage();
        this.enviando = false;//ended
      });

    }else{
      //console.log('vacio');
      this.changeWarningMessage();
      this.enviando = false;//ended
    }
  }

}



