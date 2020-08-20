import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() title = 'Sin titulo';

  // tslint:disable-next-line: no-input-rename
  @Input('labels') public doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label2'];

  // tslint:disable-next-line: no-input-rename
  @Input('data') public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];

  public colors: Color[] = [
    { backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ] }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
