import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  public users:User[] = [];
  public doctors:Doctor[] = [];
  public hospitals:Hospital[] = [];
  
  constructor( private activatedRouter:ActivatedRoute,
               private searchServices:SearchesService ) { }

  ngOnInit(): void {
    this.activatedRouter
        .params
        .subscribe(({text})=>this.globalSearch(text));
  }
  globalSearch(text:string){
    this.searchServices.globalSearch(text).subscribe((resp:any)=>{ 
      this.users = resp.users;
      this.doctors = resp.doctors;
      this.hospitals = resp.hospital;
    });
  }
}
