import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts'; 
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {
  
  @Input('title') titulo:string="Titulo";
  @Input('labels') doughnutChartLabels:string[]=['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') doughnutChartData=[350, 450, 100]; 

  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[]=[
    { 
      backgroundColor:['rgba(0,120,212,1)','rgba(var(--palette-neutral-2,248, 248, 248),1);','#FFB414']
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
