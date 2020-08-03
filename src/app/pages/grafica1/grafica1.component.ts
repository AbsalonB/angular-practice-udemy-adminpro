import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  public labels1:string[]=['Descargas', 'Cargas', 'Correo'];
  public data1 = [150, 50, 400];
  public labels2:string[]=['Free Fire', 'Pokemon Go', 'Call of Duty'];
  public data2 = [50, 450, 300];
  public labels3:string[]=['Rock', 'Pop', 'Tra'];
  public data3 = [250, 40, 310];
  public labels4:string[]=['Historia', 'Poesia', 'Misterio'];
  public data4 = [30, 50, 300];

  constructor() { }

  ngOnInit(): void {
  }

}
