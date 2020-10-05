import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm:FormGroup;
  public user:User;
  public imageUpload:File;
  public imgTemp:any=null;

  constructor(private fb:FormBuilder,
              private userService: UserService,
              private fileUploadService: FileUploadService) { 

                this.user = userService.user;
              }

  ngOnInit(): void {
    this.profileForm=this.fb.group({
      name: [this.user.name,Validators.required],
      email:[this.user.email,[Validators.required,Validators.email]],
    });
  }
  updateProfile(){
    this.userService.updateProfile( this.profileForm.value )
        .subscribe( resp=>{
          const { name, email} = this.profileForm.value;
          this.user.name = name;
          this.user.email = email;

          Swal.fire('Guardado','Cambios fueron guardados','success');
        },(err)=>{
          Swal.fire('Error',err.error.msg,'error');          
        });
  }

  changeImage(file:File){
    this.imageUpload = file;

    if(!file){ return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onload = () =>{
      this.imgTemp = reader.result;
      console.log(reader.result);
    }
  }

  uploadImage(){
    this.fileUploadService.updatePhoto(this.imageUpload,'users', this.user.uid)
    .then( img =>{
      this.user.img = img;
      Swal.fire('Guardado','Cambios fueron guardados','success');
    }).catch(err=>{
      Swal.fire('Error','Ocurrio un error al actualizar la imagen','error');
    });
  }
}
