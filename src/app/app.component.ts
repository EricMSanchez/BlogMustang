import { Component } from '@angular/core';
import {trigger,style,transition,animate, state} from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('showState',[
      state('void',style({
        transform: 'translateX(0)',
        opacity:0
      })),
      transition(':enter',[
        animate(800,style({
          transform:'translateX(100%)',
          opacity:1
        }))
      ])//completed => eliminated,
      
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
          opacity:1
        }))
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class AppComponent {
  title = 'Titulo de este componente';
 
  showMenu = true;
  showPosts = false;

  regresarMenu(){
    
    this.showMenu = true;
    this.showPosts = false;
  }
  

  receiveMessage($event) {
    this.showMenu = $event;
    this.showPosts = !$event;
    console.log("holi");
  }
}
