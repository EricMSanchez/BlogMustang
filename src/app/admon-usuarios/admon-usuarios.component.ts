import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-admon-usuarios',
  templateUrl: './admon-usuarios.component.html',
  styleUrls: ['./admon-usuarios.component.css']
})
export class AdmonUsuariosComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private user:UsersService,
    private auth:AuthService,
    private router: Router
    ) { }

  public CategoriaId;
  public titulo;
  users = null;
  msj = '';
  loading = true;
  //apiposts = null;
  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');
    let title = this.route.snapshot.paramMap.get('titulo');
    this.CategoriaId = id;
    this.titulo = title;
    this.getUsers();

  }

  getUsers(){
    this.user.getUsersAdmon(this.auth.getUser().token).subscribe(data => {
      if(data.success)
      {
        this.users = data.data;
        //console.log('posts',this.posts);
      }
    },err => {

    });
  }


  changeUserStatus(users_id,new_status){
    this.user.changeUserStatus(users_id,new_status,this.auth.getUser().token).subscribe(data => {
      if(data.success)
      {
        this.getUsers();
        //console.log('posts',this.posts);
      }
    },err => {

    });
  }

  

}
