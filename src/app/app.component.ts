import { Component,OnInit } from '@angular/core';
import { trigger, transition, style, group, query, animate,state } from '@angular/animations';
import { slideInAnimation } from './animations';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { delay, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EventEmiterService } from './event-emiter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {

  constructor(private _eventEmiter: EventEmiterService) {
  }

  
  private _success = new Subject<string>();
  OpenLoginWin:boolean;
  staticAlertClosed = false;
  successMessage: string;
  error = false;
  showFooter = null;
  ngOnInit(){

   // this.setDataStr();
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(1000)
      
      
    ).subscribe(data => {
      if(!this.error)
      {
        this.showFooter = true;
        //this.router.navigate(['/'], { skipLocationChange: false });
      }
    },() => this.successMessage = null);
  }
  onAnimationEvent ( event: AnimationEvent ) {
    this.changeSuccessMessage()
  }
  triggerAnimation(outlet) {
    
    return (outlet.activatedRouteData.animation || null) ;
  }

  public changeSuccessMessage() {
    this.showFooter = false;
    this._success.next(`Success msg`);
  }

  
  openWindow(eventData:boolean){

    this.OpenLoginWin = eventData;
  }
}