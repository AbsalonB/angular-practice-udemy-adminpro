import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu =[];  
  loadMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
  // menu:any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono:'mdi mdi-gauge',
  //     submenu:[
  //       {titulo:'Main',url:'/'},
  //       {titulo:'ProgressBar',url:'progress'},
  //       {titulo:'Graficas',url:'grafica1'},
  //       {titulo:'Promesa',url:'promesa'}, 
  //       {titulo:'RXJS',url:'rxjs'} 
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono:'mdi mdi-folder-lock-open',
  //     submenu:[
  //       {titulo:'Usuarios',url:'users'},
  //       {titulo:'Hospitales',url:'hospitals'},
  //       {titulo:'Médicos',url:'doctors'}, 
  //     ]
  //   }
  // ];
  constructor() { }
}
