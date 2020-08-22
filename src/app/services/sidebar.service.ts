import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any[] = [
    {
      titulo: 'Dashboard',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo:'Main',url:'/'},
        {titulo:'ProgressBar',url:'progress'},
        {titulo:'Graficas',url:'grafica1'},
        {titulo:'Promesa',url:'promesa'}, 
        {titulo:'RXJS',url:'rxjs'} 
      ]
    }
  ];
  constructor() { }
}
