import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,animate, state} from '@angular/animations'
import { slideInAnimation } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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
