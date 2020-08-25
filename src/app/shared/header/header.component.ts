import { Component, OnInit } from '@angular/core';

import { Usuario } from './../../models/usuario.model';

import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    // this.imageUrl = this.usuarioService.usuario.imagenUrl();
    this.usuario = this.usuarioService.usuario;
  }

  logout(): void {
    this.usuarioService.logout();
  }

}
