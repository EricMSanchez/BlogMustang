import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PostsComponent,DialogContentDialog } from './posts/posts.component';
import { DialogContentComponent} from './dialog-content/dialog-content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgcFloatButtonModule} from '../../node_modules/ngc-float-button';
import {DemoMaterialModule} from '../app/demo-material/demo-material.module';

//import {MatDialog} from '@angular/material/dialog';
//import {BehaviorSubject} from '../../node_modules/rxjs'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    PostsComponent,
    DialogContentComponent,
    DialogContentDialog
  ],
  entryComponents:[DialogContentDialog],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgbModule.forRoot(),
    DemoMaterialModule,
    //MatDialog,
    //BehaviorSubject,
    NgcFloatButtonModule
  ],
  exports: [
    NgcFloatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
