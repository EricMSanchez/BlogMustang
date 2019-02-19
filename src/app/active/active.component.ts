import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {

  id = 'NA';
  error = false;
  activo = false;
  msg = '';
  constructor(private route: ActivatedRoute,
    private user:UsersService,
    private router: Router) { }

  ngOnInit() {
   // this.id = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
  });
    if(this.id != null)
    {
      this.user.activate(this.id).subscribe(data => {
        if(data.success)
        {
          if(data.data['message'] === 'USUARIO_YA_ACTIVO'){
            this.router.navigate(['/'], { skipLocationChange: true });
          }else if(data.data['message'] === 'SE_ACTIVO_USUARIO'){
            this.activo = true;
            this.msg = 'El usuario se ha activado con exito!'
          }else{
            this.error = true;
          }
          
        }else{
          this.error = true;
        }
        
      });
      
    }else{
      this.error = true;
    }
  }

}
