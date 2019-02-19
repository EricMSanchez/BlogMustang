import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgModel,NgForm } from '@angular/forms'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UsersService } from '../users.service';
import { AuthService } from '../auth.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-califica',
  templateUrl: './califica.component.html',
  styleUrls: ['./califica.component.css']
})
export class CalificaComponent implements OnInit {

  constructor(private route: ActivatedRoute,private users:UsersService,private auth:AuthService) { }

  public CategoriaId;
  public titulo;
  rating = 3;

  vendors:any;
  comment:string='';
  vendedor:string;

  private _success = new Subject<string>();
  
  staticAlertClosed = false;
  successMessage: string;
  type = '';
  isVendors = false;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    let title = this.route.snapshot.paramMap.get('titulo');
    this.CategoriaId = id;
    this.titulo = title;

    this.users.getVendedores(this.auth.getUser().token).subscribe( data => {
      if(data.success)
      {
        this.vendors = data.data;
        // this.vendors = [{"users_id":0,"username":"No se encontraron vendedores."}];
        this.isVendors = true;
      }else{
        this.vendors = [{"users_id":0,"username":"No se encontraron vendedores."}];
        this.isVendors = false;
      }
    });

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

  public changeWarningMessage() {
    this.type = 'warning';
    this._success.next(`Favor de seleccionar el <b>vendedor</b> y agregar los <b>comentarios</b>.`);
  }

  saveRating(){
    if(this.comment.toString().trim() != '' && this.vendedor != null)
    {
      let now = new Date();
      this.users.saveRating(
        this.vendedor,
        this.comment,
        formatDate(now, 'yyyy-MM-dd H:mm:ss', 'en-US', '-8000'),
        this.rating,
        this.auth.getUser().token).subscribe(data => {
          if(data.success){
            this.vendedor = null;
            this.comment = '';
            this.changeSuccessMessage();
          }else{
            this.changeErrorMessage();
          }
      });
    }else{
      //console.log('vacio');
      this.changeWarningMessage();
    }
  }

}
