import { Router } from '@angular/router';
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

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
    // this.imageUrl = this.usuarioService.usuario.imagenUrl();
    this.usuario = this.usuarioService.usuario;
  }

  logout(): void {
    this.usuarioService.logout();
  }

  buscar(termino: string): void {
    // console.log(termino);
    if ( termino.length === 0  ) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

}
