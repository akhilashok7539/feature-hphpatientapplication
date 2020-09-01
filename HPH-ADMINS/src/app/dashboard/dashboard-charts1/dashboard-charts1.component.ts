import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { HospitalService } from 'src/app/hospital/hospital.service';
@Component({
  selector: 'app-dashboard-charts1',
  templateUrl: './dashboard-charts1.component.html',
  styleUrls: ['./dashboard-charts1.component.css']
})
export class DashboardCharts1Component implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [ 'Register By Sales','Register By admin','Register By Public '];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  adminHospitalCount: any;
  salesHospitalCount: any;
  publicHospitalCount: any;

  // colors: Color[] = [
  //   {
  //     backgroundColor: [
  //       'red',
  //       'green',
  //       'blue'
  //     ]
  //   }
  // ];
  constructor(private hospitalservice:HospitalService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    // var o_list = [{id:1,name:"jo"},{id:2,name:"mo"}];
    // var list = o_list.map(x => x.id); //array to list 
    //  console.log(list)
     this.hospitalservice.gethospitalByRegistration().subscribe(
       data =>{
        console.log(data)
        this.adminHospitalCount = data['adminHospitalCount'];
        this.salesHospitalCount = data['salesHospitalCount'];
        this.publicHospitalCount = data['publicHospitalCount'];
        this.pieChartData = [this.salesHospitalCount,this.adminHospitalCount,this.publicHospitalCount]
        console.log(this.pieChartData)
      
      },
       error =>{

       }
     )
  }

}
