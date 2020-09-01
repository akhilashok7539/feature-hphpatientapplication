import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  color = 'warn';
  mode = 'indeterminate';
  value = 50;
  showText = 'Loading';
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoadingService){}

  ngOnInit() {
  }
}
