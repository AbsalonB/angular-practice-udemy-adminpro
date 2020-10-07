import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../services/modal-image.service';
@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {
  
  public imageUpload:File;
  public imgTemp:any=null;
  constructor(public modalImageService:ModalImageService,
              public fileUploadService:FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal(){
     this.imgTemp = null;
     this.modalImageService.closeModal();
  }

  changeImage(file:File){
    this.imageUpload = file;

    if(!file){ return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onload = () =>{
      this.imgTemp = reader.result; 
    }
  }

  uploadImage(){
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;
    this.fileUploadService.updatePhoto(this.imageUpload, type, id)
    .then( img =>{ 
      Swal.fire('Guardado','Cambios fueron guardados','success');
      this.modalImageService.newImage.emit(img);
      this.closeModal();
    }).catch(err=>{
      Swal.fire('Error','Ocurrio un error al actualizar la imagen','error');
    });
  }
}
