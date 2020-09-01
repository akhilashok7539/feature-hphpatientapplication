import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HospitalService } from 'src/app/hospital/hospital.service';
@Component({
  selector: 'app-dashboardchart2',
  templateUrl: './dashboardchart2.component.html',
  styleUrls: ['./dashboardchart2.component.css']
})
export class Dashboardchart2Component implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56], label: 'Appointments' },

  ];
  hospitallist: any = [];
  chartdataCount: any;
  constructor(private hospitalservice: HospitalService) { }

  ngOnInit() {
    this.top5hospital();
  }
  top5hospital() {
    this.hospitalservice.gettop5hospitals().subscribe(
      data => {
        console.log(data);
        this.hospitallist = data;
        var o_list = this.hospitallist;
        var list = o_list.map(x => x['1'].hospitalName); //array to list 
        console.log(list)
        // console.log(o_list.map(x => x['1'].hospitalName.slice(0, 3)))
        this.barChartLabels = list;
        this.chartdataCount = o_list.map(x => x['0']);
        console.log(this.chartdataCount)
        this.barChartData = [
          {
            data:this.chartdataCount,label: 'Appointments'
          }
        ]
      },
      error => {

      }
    )
  }
}
