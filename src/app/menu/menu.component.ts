import { Component, OnInit,Output,EventEmitter,Input  } from '@angular/core';
import {trigger,style,transition,animate, state} from '@angular/animations';
import { RouterLink,Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { slideInAnimation } from '../animations';
import { MenuService } from '../menu.service';
import { fas } from '@fortawesome/free-solid-svg-icons';
//import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';


library.add(fas);
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

  results = null;
  constructor(private router: Router,private menuService:MenuService) { }

  ngOnInit() {
    this.menuService.getCategories().subscribe(data => {
      this.results = data.categories;
      //console.log('info=',this.results);
    });
   
  }

    async toPosts(id,titulo) {
      if(id == '6'){
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
