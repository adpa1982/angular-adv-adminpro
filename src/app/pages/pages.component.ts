import { Component, OnInit } from '@angular/core';

import { SettingsService } from './../services/settings.service';
import { SidebarService } from './../services/sidebar.service';

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

  constructor(private settingsService: SettingsService,
              private sidebarService: SidebarService) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }

}
