import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HospitalService } from 'src/app/hospital/hospital.service';
@Component({
  selector: 'app-dashboardchart3',
  templateUrl: './dashboardchart3.component.html',
  styleUrls: ['./dashboardchart3.component.css']
})
export class Dashboardchart3Component implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [0,0,0,0,0,0], label: 'Appointments' },
 

  ];
  public lineChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sept','October','Nov','Dec'];
   lineChartOptions: (ChartOptions ) = {
   
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(0 158 251 / 58%)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  year:any ='Month';
  dataset;
  appointmetnlist : any = [];
  constructor(private hospitalservic:HospitalService) { }

  ngOnInit() {
    this.getappointmentsbymonth();
  }
  getappointmentsbymonth(){
    this.hospitalservic.getallappointmentsbymonth().subscribe(
      data =>{
        console.log(data)
        this.appointmetnlist = data;
        var o_list = this.appointmetnlist;
        this.dataset = o_list.map(x => x['1']);
        this.lineChartLabels =  o_list.map(x => x['0']);
        this.lineChartData =[
          { data: this.dataset, label: 'Appointments' }
          
         ]
        // console.log(list)
      },
      error =>{

      }
    )
  }
  getappoinmentson6years(){
    this.hospitalservic.getappoinmentson6years().subscribe(
      data =>{
        console.log(data)
        this.appointmetnlist = data;
        var o_list = this.appointmetnlist;
        this.dataset = o_list.map(x => x['1']);
        this.lineChartLabels =  o_list.map(x => x['0']);
        this.lineChartData =[
          { data: this.dataset, label: 'Appointments' }
          
         ]
        // console.log(list)
      },
      error =>{

      }
    )
  }
  getYearselected(e)
  {
    if(e == 'Year')
    {
      this.getappoinmentson6years();
    }
    else if(e == 'Month')
   {
    this.getappointmentsbymonth();
   }
  }
}
