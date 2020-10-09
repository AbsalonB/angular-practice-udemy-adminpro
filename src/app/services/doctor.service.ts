import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  } 

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  loadDoctors(){
    const url=`${base_url}/doctors`;
    return this.http.get(url,this.headers)
                .pipe(
                  map( (resp:{ok:boolean,doctors:Doctor[]})=> resp.doctors )
                );
  }

  loadDoctorById(id:string){
    const url=`${base_url}/doctors/${id}`;
    return this.http.get(url,this.headers)
                .pipe(
                  map( (resp:{ok:boolean,doctor:Doctor})=> resp.doctor )
                );
  }

  deleteDoctor(_id:string){
    const url=`${base_url}/doctors/${_id}`;
    return this.http.delete(url,this.headers); 
  }

  createDoctor(doctor:{ name:string, hospital:string }){
      return this.http.post(`${ base_url }/doctors`, doctor, this.headers);
  } 

  updateDoctor(doctor:Doctor){
    const url = `${base_url}/doctors/${doctor._id}`; 
    return this.http.post(url, doctor, this.headers); 
  
  }
}
