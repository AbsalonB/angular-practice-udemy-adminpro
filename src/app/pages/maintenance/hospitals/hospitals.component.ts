import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: any[]=[];
  public hospitalsTemp: Hospital[]=[];
  public loading: boolean = true;
  private imgSubs:Subscription;

  constructor(private hospitalService:HospitalService,
              private searcherService:SearchesService,
              private modalImageService:ModalImageService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadingHospitals();
    this.imgSubs = this.modalImageService.newImage
        .pipe(delay(100))
        .subscribe( img => this.loadingHospitals());
  }
  
  loadingHospitals(){
    this.loading = true;
    this.hospitalService.loadHospitals()
        .subscribe( hospitals => {
          this.loading = false;
          this.hospitals = hospitals; 
        }); 
  } 

  saveChanges(hospital:Hospital){
      this.hospitalService.updateHospital(hospital._id, hospital.name)
        .subscribe(resp=>{
          Swal.fire('Actualizado', hospital.name,'success');
        });
  }

  deleteHospital(hospital:Hospital){
    this.hospitalService.deleteHospital(hospital._id)
      .subscribe(resp=>{
        this.loadingHospitals();
        Swal.fire('Eliminado', hospital.name,'success');
      });
  }

  async openSweetAlertModal(){
    const {value = ''} = await Swal.fire<string>({
      title:'Crear hospital',
      text:'Ingrese el nombre del nuevo hospital',
      input: 'text',
      showCancelButton:true,
      inputPlaceholder:'Nombre del hospital'
    });

    if(value.trim().length>0){
      this.hospitalService.createHospital(value.trim())
          .subscribe((resp:any) => {
            this.hospitals.push(resp.hospital);
          });
    }
  }

  openModal(hospital:Hospital){
      this.modalImageService.openModal('hospitals',hospital._id,hospital.img);
  }

  search(text:string){ 
    if(text.length===0){
      return this.hospitals = this.hospitalsTemp;
    }else{
      this.searcherService.search('hospitals',text)
          .subscribe(resp=>{
            this.hospitals= resp;
          });
    }
  }
}
