import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PostsComponent,DialogContentDialog } from './posts/posts.component';
import { DialogContentComponent} from './dialog-content/dialog-content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgcFloatButtonModule} from '../../node_modules/ngc-float-button';
import { DemoMaterialModule } from '../app/demo-material/demo-material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalificaComponent } from './califica/califica.component';
import { PostComponent } from './post/post.component'
import { MenuService } from './menu.service';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule,ReactiveFormsModule} from '@angular/forms'
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { PostsService } from './posts.service';
import { NgxEditorModule } from 'ngx-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { FooterComponent } from './footer/footer.component';
//import {MatDialog} from '@angular/material/dialog';
//import {BehaviorSubject} from '../../node_modules/rxjs'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    PostsComponent,
    DialogContentComponent,
    DialogContentDialog,
    HomeComponent,
    CalificaComponent,
    PostComponent,
    LoginComponent,
    RegistroComponent,
    FooterComponent
  ],
  entryComponents:[DialogContentDialog],
  imports: [
    TooltipModule.forRoot(),
    NgxEditorModule, 
    FormsModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgbModule.forRoot(),
    DemoMaterialModule,
    ReactiveFormsModule,
    //MatDialog,
    //BehaviorSubject,
    NgcFloatButtonModule,
    RouterModule.forRoot(
      [
        {
          path:'content',
          component:DialogContentComponent
        },
        {
          path:'posts',
          component:PostsComponent,
          data: { animation: 'posts' }
        },
        {
          path:'califica',
          component:CalificaComponent,
          data: { animation: 'califica' }
        },
        {
          path :'',
          component:HomeComponent,
          data: { animation: 'home' }
        },
        {
          path :'post',
          component:PostComponent,
          data: { animation: 'post' }
        },
        {
          path: 'login',
          component:LoginComponent,
          data: {animation:'login'}
        },
        {
          path: 'registro',
          component:RegistroComponent,
          data: {animation:'registro'}
        }
      ]
    ),
    HttpClientModule
  ],
  exports: [
    NgcFloatButtonModule
  ],
  providers: [MenuService,PostsService,ErrorStateMatcher,ShowOnDirtyErrorStateMatcher],
  bootstrap: [AppComponent]
})
export class AppModule { }
