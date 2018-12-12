import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog,private router: Router) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(LoginComponent, {
    });
  }

  toRegistro(){
    this.router.navigate(['/registro',{}], { skipLocationChange: true });
  }

}
