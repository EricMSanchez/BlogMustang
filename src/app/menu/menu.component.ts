import { Component, OnInit,Output,EventEmitter,Input  } from '@angular/core';
import {trigger,style,transition,animate, state} from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations:[
    trigger('showState',[
      state('void', style({
        transform: 'translateX(-100%)',
        opacity: 1
      }))
    ]),
    trigger('openClose',[ 
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('open => closed', [
        animate('1s',style({
          transform:'translateX(100%)',
          opacity:0
        }))
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
      state('void',style({
        transform: 'translateX(100%)',
        opacity:0
      })),
      transition(':enter',[
        animate('1s',style({
          transform:'translateX(0)',
          opacity:1
        }))
      ]),
    ])
  ]
})

export class MenuComponent implements OnInit {

  isOpen = true;
  
  
  @Output() showMenu = new EventEmitter<boolean>();

  @Input() isVisibleMenu = true;
  async  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async toggle() {
    this.isOpen = !this.isOpen;
     await this.delay(1000);
     this.showMenu.emit(!this.isVisibleMenu);
    
  }


  results = [{"id":"busco","descr":"En esta seccion podras postear articulos que estes buscando.","titulo":"Busco","Imagen":"../../assets/img/search.png"},
  {"id":"vendo","descr":"Aqui podras postear y buscar articulos para venta.","titulo":"Vendo","Imagen":"../../assets/img/vendo2.png"},
  {"id":"hazlo","descr":"Tutoriales o guias que te podrian servir de ayuda.","titulo":"Hazlo tu mismo","Imagen":"../../assets/img/yourself2.png"},
  {"id":"proyecto","descr":"Quieres exponer tu proyecto? esta es la seccion.","titulo":"Mi Proyecto","Imagen":"../../assets/img/myproject.png"},
  {"id":"partes","descr":"Busqueda de partes que no tengan que ver con Mustangs","titulo":"Partes No mustang","Imagen":"../../assets/img/engine2.png"},
  {"id":"califica","descr":"Ayuda a la comunidad proporcionando tu evaluacion.","titulo":"Califica a tu vendedor","Imagen":"../../assets/img/rate.png"}];


  constructor() { }

  ngOnInit() {
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
