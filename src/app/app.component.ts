import { Component } from '@angular/core';
import { trigger, transition, style, group, query, animate } from '@angular/animations';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {

  triggerAnimation(outlet) {
    return outlet.activatedRouteData.animation || null;
  }
}