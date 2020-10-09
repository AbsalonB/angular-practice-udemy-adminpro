import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {  
  public doctorForm:FormGroup;
  public hospitals:Hospital[]=[];
  public doctorSelected:Doctor;
  public hospitalSelected:Hospital;

  constructor(private fb:FormBuilder,
              private hospitalService:HospitalService,
              private doctorService:DoctorService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }
 
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.loadDoctor(id));
    
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.loadHospitals();
    this.doctorForm.get('hospital').valueChanges
        .subscribe( hospitalId => {
            this.hospitalSelected = this.hospitals.find( h=> h._id === hospitalId);
        })
  }

  loadDoctor(id:string){
    console.log(id);
    if(id==='nuevo'){
      return;
    }
     
    this.doctorService.loadDoctorById(id)
        .pipe(
          delay(100)
        )
        .subscribe(doctor=>{
          if(!doctor){
            this.router.navigateByUrl(`/dashboard/doctors`);
          }
          const {name, hospital:{_id}} = doctor;
           this.doctorSelected = doctor; 
        });
  }

  loadHospitals(){
    this.hospitalService.loadHospitals()
        .subscribe((hospitals:Hospital[])=>{
            this.hospitals = hospitals;
        })
  }

  createDoctor(){
    const { name }= this.doctorForm.value;
    if( this.doctorSelected){
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id
      }
      this.doctorService.updateDoctor(data)
          .subscribe(resp=>{
            Swal.fire('Crado',`${name} creado correctamente`,'success');  
          });
    } else { 
      this.doctorService.createDoctor( this.doctorForm.value )
          .subscribe( (resp:any) => {
            Swal.fire('Crado',`${name} creado correctamente`,'success');
            this.router.navigateByUrl(`/dashboard/doctor/${resp.doctor._id}`);
          });
    } 
  }
}
