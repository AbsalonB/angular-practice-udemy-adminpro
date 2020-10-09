import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs/operators';
const base_url = environment.base_url;

 @Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

    loadHospitals(){
      const url=`${base_url}/hospitals`;
      return this.http.get(url,this.headers)
                  .pipe(
                    map( (resp:{ok:boolean,hospital:Hospital[]})=> resp.hospital )
                  );
    }

    createHospital(name:string){
      const url=`${base_url}/hospitals`;
      return this.http.post(url, { name }, this.headers);
    } 

    updateHospital(_id:string, name:string){
      const url=`${base_url}/hospitals/${_id}`;
      return this.http.put(url, { name }, this.headers);
    } 

    deleteHospital(_id:string){
      const url=`${base_url}/hospitals/${_id}`;
      return this.http.delete(url, this.headers);
    } 
}
