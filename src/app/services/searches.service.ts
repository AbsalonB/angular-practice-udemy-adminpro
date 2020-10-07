import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from '../../../src/environments/environment'; 
import { User } from '../models/user.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(private http: HttpClient) { }

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

  private transformUsers(result:any[]):User[]{
    return result.map(
      user=> new User(user.name, user.email,'',user.img,user.google,user.role,user.uid)
    );
  }

  search(type:'users'|'doctors'|'hospitals', text_search:string){
    const url=`${base_url}/todo/collection/${type}/${text_search}`; 
    return this.http.get<any[]>(url,this.headers)
            .pipe(
              map((resp:any)=> {
                switch (type) {
                  case 'users':
                      return this.transformUsers(resp.users);
                    break;
                
                  default:
                    return [];
                }
              })
            );
  }
}
