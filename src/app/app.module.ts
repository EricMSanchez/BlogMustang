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
import { ActiveComponent } from './active/active.component';
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service';
import { PerfilComponent } from './perfil/perfil.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EventEmiterService } from './event-emiter.service';
import { ContactoComponent } from './contacto/contacto.component';
import { AdminComponent } from './admin/admin.component';
import { AdmonUsuariosComponent } from './admon-usuarios/admon-usuarios.component';
import { AdmonPostsComponent } from './admon-posts/admon-posts.component';
import { AdmonCategoriasComponent, DialogContent } from './admon-categorias/admon-categorias.component';
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
    DialogContent,
    HomeComponent,
    CalificaComponent,
    PostComponent,
    LoginComponent,
    RegistroComponent,
    FooterComponent,
    ActiveComponent,
    PerfilComponent,
    ForgotComponent,
    ResetComponent,
    UsuarioComponent,
    ContactoComponent,
    AdminComponent,
    AdmonUsuariosComponent,
    AdmonPostsComponent,
    AdmonCategoriasComponent
  ],
  entryComponents:[DialogContentDialog,DialogContent,],
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
          canActivate: [AuthGuard],
          data: { animation: 'califica' }
        },
        {
          path :'',
          component:MenuComponent,
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
        },
        {
          path: 'activacion',
          component:ActiveComponent,
          data: {animation:'activacion'}
        },
        {
          path: 'perfil',
          component:PerfilComponent,
          data: {animation:'perfil'}
        },
        {
          path: 'forgotPassword',
          component:ForgotComponent,
          data: {animation:'forgotPassword'}
        },
        {
          path: 'changePassword',
          component:ResetComponent,
          data: {animation:'changePassword'}
        },
        {
          path: 'usuario',
          component:UsuarioComponent,
          data: {animation:'usuario'}
        },
        {
          path: 'contacto',
          component:ContactoComponent,
          data: {animation:'contacto'}
        },
        {
          path: 'usersadmon',
          component:AdmonUsuariosComponent,
          data: {animation:'usersadmon'}
        },
        {
          path: 'postsadmon',
          component:AdmonPostsComponent,
          data: {animation:'postsadmon'}
        },
        {
          path: 'categoryadmon',
          component:AdmonCategoriasComponent,
          data: {animation:'categoryadmon'}
        }

      ]
    ),
    HttpClientModule
  ],
  exports: [
    NgcFloatButtonModule
  ],
  providers: [MenuService,PostsService,ErrorStateMatcher,ShowOnDirtyErrorStateMatcher,AuthGuard,AuthService,EventEmiterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
