import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: [ './nopagefound.component.css' ]
})
export class NopagefoundComponent implements OnInit {

  public year: number;

  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
