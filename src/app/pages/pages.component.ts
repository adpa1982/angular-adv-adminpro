import { Component, OnInit } from '@angular/core';

import { SettingsService } from './../services/settings.service';

// Funcion del archivo \src\assets\js\custom.min.js
// Definicion de una funcion global
declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
