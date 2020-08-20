import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css']
})
export class ProgressComponent implements OnInit {

  progress1 = 15;
  progress2 = 30;

  constructor() { }

  ngOnInit(): void {

  }

  get porcentaje1(): any {
    return `${ this.progress1 }%`;
  }

  get porcentaje2(): any {
    return `${ this.progress2 }%`;
  }

}
