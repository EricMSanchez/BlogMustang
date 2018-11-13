import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-califica',
  templateUrl: './califica.component.html',
  styleUrls: ['./califica.component.css']
})
export class CalificaComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public CategoriaId;
  public titulo;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    let title = this.route.snapshot.paramMap.get('titulo');
    this.CategoriaId = id;
    this.titulo = title;
  }

}
