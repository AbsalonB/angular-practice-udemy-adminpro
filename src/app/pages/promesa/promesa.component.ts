import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [
  ]
})
export class PromesaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios=>{
      console.log(usuarios);
    });
    // const promesa = new Promise((resolve,reject)=>{
    //   if(false){
    //     resolve('lelelel');
    //   }
    //   else{
    //     reject('lelaisdn332');
    //   }
    // });

    // promesa.then((mensaje)=>{
    //   console.log(mensaje);
    // }).catch((mensaje)=>{
    //   console.log(mensaje);
    // })
    // console.log('afuera');
  }

  getUsuarios(){
    const promise =new Promise(resolve=>{

      fetch('https://reqres.in/api/users')
      .then(response=> response.json())
      .then(body=>resolve(body.data));
    })
    return promise;
  }

}
