import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,animate, state} from '@angular/animations';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  animations:[
    trigger('showState',[
      state('void',style({
        //transform: 'translateX(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate('1s',style({
         // transform:'translateX(0)',
          opacity:1
        }))
      ])
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
          opacity:0
        }))
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
      transition(':enter',[
        animate('1s',style({
          transform:'translateX(0)',
          opacity:1
        }))
      ]),
    ])
  ]
})
export class PostsComponent implements OnInit {
 
  constructor(public dialog: MatDialog,private route: ActivatedRoute) { }

  public CategoriaId;
  public titulo;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    let title = this.route.snapshot.paramMap.get('titulo');
    this.CategoriaId = id;
    this.titulo = title;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
/*
  openPost(titulo,desc,fecha,user,precio) {
    const dialogRef = this.dialog.open(PostContent);
    dialogRef.componentInstance.titulo = titulo;
    dialogRef.componentInstance.desc = desc;
    dialogRef.componentInstance.fecha = fecha;
    dialogRef.componentInstance.user = user;
    dialogRef.componentInstance.precio = precio;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }*/

  
  texto = `Judicio non ejusdem referam hoc. Audiam debeat per infixa durent ibi mentem. Si ut mali ei duce im esto fert apta. Ego age habet has docti tes cogor locis. Id concipio monendos vi de sentiens at. Ex plerosque in si inhaereat scriptura. 
  Re scripturas virtutibus ob existimavi progressus si quascunque et. Sua aptum autho sit fuere licet res. Ut sequutus arbitror ei scriptae importat judicare mo comparem et. Meditatas pro tantumque usu vul conjectus aliquando. Contendo ineptire diversum cap integram superare nos bonitati. Occasio ejusdem sirenes rum hoc. Fuerunt sap meo creatum vix ceteris similia. Posuerunt cum est manifesta tempusque remanetne examinare. 
  Cupiam deinde nullum errore perire cui eam. Ea meliores commoveo et notandum gi connivet possumne ex. Industriam cohaereant consuetudo gi sequentium mo si is facillimam. Semper possem mo reipsa audita ad ei fingam in. Tractatu sentiens vi ostendam id cogitans to. Mo co exhibentur praesertim varietates ha. Vis cap illo quem uno illa. 
  Usu omnis etc satis sum ullum. Fuisse jam qualia obstat hae fal per quidam tamdiu. Somniemus dei tribuebam cur ens exhibetur percipere. Eae nam mem dum istas intra donec. Age somniorum similibus praeclare removendo via. Extitisse ima hic obdormiam recurrunt quocunque hos vis. 
  `;
  posts = 
  [
    {"titulo":"Transmision automatica","fecha":"2018-09-11","username":"Juan Valenzuela","desc":"Busco transmision automatica de mustang 97...","mensaje":""+this.texto,"url":"../../assets/img/motor.jpg"},
    {"titulo":"Motor V6 3.8L","fecha":"2018-10-21","username":"Jorge Camacho","desc":"Una descripcion cualquiera para test...","mensaje":""+this.texto},
    {"titulo":"Motor V8 4.3L","fecha":"2018-08-14","username":"Joel Miranda","desc":"Otra descripcion cualquiera para otro test...","mensaje":""+this.texto},
    {"titulo":"Faros anti niebla Mustang 94-04","fecha":"2018-09-15","username":"Jose Jose","desc":"Solo describo para mostrar text en test","mensaje":""+this.texto},
    {"titulo":"Defensa delantera Mustang 2010","fecha":"2018-09-25","username":"Vicente Fernandez","desc":"Descripcion de cualquier cosa etc...","mensaje":""+this.texto}
  ]

}

@Component({
  selector: 'dialog-content-dialog',
  templateUrl: 'dialog-content-dialog.html',
})

export class DialogContentDialog {}



/*
@Component({
  selector: 'post-content',
  template: `
  <div class="content" style="min-height:40em;min-width:40em;">
  <h2 mat-dialog-title>{{titulo}}</h2>
      
      <mat-dialog-content class="mat-typography">

        <p>{{desc}}</p>

        <p>Posteado {{fecha}} por {{user}}</p>
          
      </mat-dialog-content>
      
  </div>
  <mat-dialog-actions align="end">
        <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Cerrar</button>
      </mat-dialog-actions>
  `,
})

export class PostContent {
  titulo:string;
  desc:string;
  fecha:string;
  precio:string;
  user:string;

}
*/