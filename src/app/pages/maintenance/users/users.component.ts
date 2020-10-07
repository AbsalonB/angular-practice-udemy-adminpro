import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers:Number=0;
  public usersT:User[]=[];
  public usersTemp:User[]=[];
  public from:number=0;
  public loading:boolean = true;
  public imgSubs:Subscription;
  constructor(private userService:UserService, 
              private searcherService:SearchesService,
              private modalImageService:ModalImageService) { }

  ngOnDestroy():void{
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImageService.newImage
        .pipe(delay(1000))
        .subscribe( img=> this.loadUsers())
  }

  loadUsers(){
    this.loading = true;
    this.userService.loadUsers(this.from).subscribe(({total,users})=>{
      this.totalUsers = total; 
        this.usersT = users; 
        this.usersTemp = users; 
        this.loading = false; 
    });
  }

  pagination(value:number){
    this.from += value;
    if(this.from<0){
      this.from = 0;
    } else if (this.from>=this.totalUsers){
      this.from -= value;
    }
    this.loadUsers();
  }

  search(text:string){ 
    if(text.length===0){
      return this.usersT = this.usersTemp;
    }else{
      this.searcherService.search('users',text)
          .subscribe(resp=>{
            this.usersT= resp;
          });
    }
  }

  deleteUser(user:User){
    if(user.uid===this.userService.uid){
      return Swal.fire('Error','No puede borrar ese usuario','info');
    } 
    Swal.fire({
      title:'¿Borrar usuario?',
      text:`Esta a punto de borrar a ${user.name}`,
      icon:'question',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Sí, borrarlo',      
    }).then((result)=>{
      if(result.value){
        this.userService.deleteUsers(user)
            .subscribe(resp=>{
              Swal.fire(
                'Usuario borrado',
                `${user.name} fue eliminado correctamente`,
                'success',
              );
              this.loadUsers();
            });
      }
    });
  }

  changeRole(user:User){
    this.userService.saveUser(user)
        .subscribe(resp=>{
          console.log(resp);
        });
  }

  openModal(user:User){
    this.modalImageService.openModal('users', user.uid, user.img);
    console.log(user);
  }
}
