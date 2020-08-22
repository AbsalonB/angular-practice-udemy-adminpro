import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter,map } from 'rxjs/operators'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo:string;
  public tituloSubs$:Subscription;

  constructor(private router:Router, private route:ActivatedRoute) { 
    // console.log(route.snapshot.children);
   this.tituloSubs$= this.getArgumentosRuta()
                        .subscribe(({title})=>{
                          this.titulo = title;
                          document.title=`AdminPro - ${title}`;
                        });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }
 
  getArgumentosRuta(){
   return this.router.events
    .pipe( 
      filter( event => event instanceof ActivationEnd),
      filter((event:ActivationEnd)=>event.snapshot.firstChild===null),
      map((event:ActivationEnd)=>event.snapshot.data)
    );
  }
}
