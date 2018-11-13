import { Component, OnInit,Output,EventEmitter,Input  } from '@angular/core';
import {trigger,style,transition,animate, state} from '@angular/animations';
import { RouterLink,Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { slideInAnimation } from '../animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations:[
    slideInAnimation
  ]
})

export class MenuComponent implements OnInit {

  isOpen = true;

  
  @Output() showMenu = new EventEmitter<boolean>();

  @Input() isVisibleMenu = true;
  async  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  results = [{"id":"busco","descr":"En esta seccion podras postear articulos que estes buscando.","titulo":"Busco","Imagen":"../../assets/img/search.png"},
  {"id":"vendo","descr":"Aqui podras postear y buscar articulos para venta.","titulo":"Vendo","Imagen":"../../assets/img/vendo2.png"},
  {"id":"hazlo","descr":"Tutoriales o guias que te podrian servir de ayuda.","titulo":"Hazlo tu mismo","Imagen":"../../assets/img/yourself2.png"},
  {"id":"proyecto","descr":"Quieres exponer tu proyecto? esta es la seccion.","titulo":"Mi Proyecto","Imagen":"../../assets/img/myproject.png"},
  {"id":"partes","descr":"Busqueda de partes que no tengan que ver con Mustangs","titulo":"Partes No mustang","Imagen":"../../assets/img/engine2.png"},
  {"id":"califica","descr":"Ayuda a la comunidad proporcionando tu evaluacion.","titulo":"Califica a tu vendedor","Imagen":"../../assets/img/rate.png"}];


  constructor(private router: Router) { }

  ngOnInit() {
  }

    async toPosts(id,titulo) {
      if(id == 'califica'){
        this.router.navigate(['/califica',{"id":id,"titulo":titulo}], { skipLocationChange: true });
      }else
      {
        this.router.navigate(['/posts',{"id":id,"titulo":titulo}], { skipLocationChange: true });
      }
  }

  /*
  <a class="p-2 text-muted" href="#">Busco</a>
  <a class="p-2 text-muted" href="#">Vendo</a>
  <a class="p-2 text-muted" href="#">Hazlo tu mismo</a>
  <a class="p-2 text-muted" href="#">Mi Proyecto</a>
  <a class="p-2 text-muted" href="#">Partes No Mustang</a>
  <a class="p-2 text-muted" href="#">Califica a tu vendedor</a>
*/

}
