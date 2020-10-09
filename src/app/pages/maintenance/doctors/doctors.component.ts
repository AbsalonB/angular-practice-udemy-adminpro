import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';
import { Doctor } from '../../../models/doctor.model';
import { DoctorService } from '../../../services/doctor.service';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public doctors:any[]=[];
  public doctorTemp:Doctor[]=[];
  private imgSubs:Subscription;
  
  constructor(private doctorService:DoctorService,
              private modalImageService:ModalImageService,
              private searcherService:SearchesService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadDoctor();
    this.imgSubs = this.modalImageService.newImage
    .pipe(delay(100))
    .subscribe( img => this.loadDoctor());
  }

  loadDoctor(){
    this.loading = true;
    this.doctorService.loadDoctors()
        .subscribe( doctors => {
          this.loading = false;
          this.doctors = doctors; 
          this.doctorTemp = doctors; 
        }); 
  } 

  saveChanges(doctor:Doctor){
    this.doctorService.updateDoctor(doctor)
      .subscribe(resp=>{
        Swal.fire('Actualizado', doctor.name,'success');
    });
  }

  deleteDoctor(doctor:Doctor){
    Swal.fire({
      title:'¿Borrar usuario?',
      text:`Esta a punto de borrar a ${doctor.name}`,
      icon:'question',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Sí, borrarlo',      
    }).then((result)=>{
      if(result.value){
        this.doctorService.deleteDoctor(doctor._id)
        .subscribe(resp=>{
          Swal.fire(
            'Doctor borrado',
            `${doctor.name} fue eliminado correctamente`,
            'success',
          );
          this.loadDoctor(); 
        }); 
      }
    });
 
  }

  openModal(doctor:Doctor){
    this.modalImageService.openModal('doctors',doctor._id,doctor.img);
  }

  search(text:string){ 
    if(text.length===0){
      return this.doctors = this.doctorTemp;
    }else{
      this.searcherService.search('doctors',text)
          .subscribe(resp=>{
            this.doctors= resp;
          });
    }
  }
}
