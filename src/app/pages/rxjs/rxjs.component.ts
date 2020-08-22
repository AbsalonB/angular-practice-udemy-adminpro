import { Component } from '@angular/core';
import {Observable, interval} from 'rxjs';   
import {retry,take,map} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent  {

  constructor() {
 
    // this.returnObservable().pipe(
    //    retry(1) 
    // ).subscribe(
    //   valor=> console.log('subs: ',valor),
    //   error=> console.log('Error:',error),
    //   ()=>console.info('Obs terminado')
    // );

    this.retornaInterval().subscribe(
      console.log
      // (valor)=>console.log(valor)
    );
   } 

   retornaInterval():Observable<number>{
     return interval(1000)
                  .pipe(
                    take(4),
                    map(valor=>valor+1)
                  ); 
   }

   returnObservable():Observable<number>{
    let i = -1;
    return new Observable(observer=>{
     const intervalo = setInterval(()=>{
        i++;
        observer.next(i);
        if(i===4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i==2){
          observer.error('i en 2');
        }
      },1000)
    }); 
   }
}
 