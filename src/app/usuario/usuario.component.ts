import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private auth:AuthService,private users:UsersService) { }

    id = '';
  Name = '****'
  Username = '****';
  Email = '****@*******.com';
  Rating = '*';
  Pais = '******';
  Ciudad = '********';
  Estado = '*********';
  Posts = 0;
  verificado = 0;
  Evaluaciones = '0';
  Photo_url='';

  usuario = null;

  ngOnInit() {
    this.usuario = 1;
    this.id = this.route.snapshot.paramMap.get('id');
console.log('users_id:',this.id)
    this.users.getUser(this.auth.getUser().token,this.id).subscribe(
      data => {
        if(data.success)
        {
          this.Name = data.data['usuario']['name'];
          this.Username = data.data['usuario']['username'];
          this.Email = data.data['usuario']['email'];
          this.Rating = data.data['usuario']['rating'];
          this.Pais = data.data['usuario']['pais'];
          this.Ciudad = data.data['usuario']['ciudad'];
          this.Estado = data.data['usuario']['estado'];
          this.Photo_url = data.data['usuario']['photo_url'];
          this.verificado = data.data['usuario']['privileges_privilege_id'];
          this.Posts = data.data[0]['posts'];
          this.Evaluaciones = data.data[1]['evaluaciones'];
        }
      } ,err=> {
        alert('Ocurrio un problema.');
      }
    )
  }



}
