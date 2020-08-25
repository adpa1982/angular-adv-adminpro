import { Component, OnInit } from '@angular/core';

import { Usuario } from './../../models/usuario.model';

import { SidebarService } from './../../services/sidebar.service';
import { UsuarioService } from './../../services/usuario.service';


@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styles: [
  ]
})
export class SidebardComponent implements OnInit {

  public menuItems: any[];
  public usuario: Usuario;

  constructor(private sidebarService: SidebarService,
              private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
    // console.log('this.menuItems ', this.menuItems);
    this.usuario = this.usuarioService.usuario;
  }

  logout(): void {
    this.usuarioService.logout();
  }

}
