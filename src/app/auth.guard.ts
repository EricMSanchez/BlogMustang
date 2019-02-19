import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { MatDialog } from '@angular/material';
import { debounceTime } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements OnInit,CanActivate {
  constructor(private auth:AuthService,private router:Router,private dialog:MatDialog){

  }
  private _success = new Subject<string>();
  
  staticAlertClosed = false;
  successMessage: string;
  type = '';

  ngOnInit(){
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.auth.isLoggedIn){
        this.openDialog();
        this.router.navigate(['/']);
      }
    return this.auth.isLoggedIn;
  }
  public changeSuccessMessage() {
    this._success.next(`Bienvenido al foro TodoMustangMx!`);
  }

  public changeErrorMessage() {
    this._success.next(`El usuario o contraseña son incorrectos.`);
  }

  openDialog() {
   const dialogRef = this.dialog.open(LoginComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      if(result && !dialogRef.componentInstance.mostrar){
        this.type = 'success';
        this.changeSuccessMessage();
      }else{
        
        if(dialogRef.componentInstance.mostrar)
        {
          this.type = 'danger';
          this.changeErrorMessage();
        }
        
      }
    });
  }
}
