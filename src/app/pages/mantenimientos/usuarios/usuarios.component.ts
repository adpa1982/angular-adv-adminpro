import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import Swal, { SweetAlertResult } from 'sweetalert2';

import { Usuario } from './../../../models/usuario.model';
import { UsuarioService } from './../../../services/usuario.service';
import { BusquedasService } from './../../../services/busquedas.service';
import { ModalImagenService } from './../../../services/modal-imagen.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public usuarios: Usuario;
  public usuariosTemp: Usuario;
  public totalUsuarios = 0;
  public desde = 0;
  public cargando = true;
  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay (100))
      .subscribe( img => this.cargarUsuarios() );
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        console.log('this.totalUsuarios', this.totalUsuarios);
        console.log(usuarios);
        this.usuariosTemp = usuarios;
        this.cargando = false;
    });
  }

  cambiarPagina( valor: number ): void {
    this.desde += valor;
    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar( termino: string ): any {
    if ( termino.length === 0 ) {
        return this.usuarios = this.usuariosTemp;
    }
    this.busquedasService.buscar( 'usuarios', termino )
        .subscribe( resp => {
          this.usuarios = resp;
        });
  }

  eliminarUsuario( usuario: Usuario ): Promise<SweetAlertResult<unknown>> {

    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario( usuario )
          .subscribe( resp => {
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre } fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }

  cambiarRole( usuario: Usuario ): void {
    this.usuarioService.guardarUsuario( usuario )
      .subscribe( resp => {
        console.log(resp);
      });
  }

  abrirModal(usuario: Usuario): void {
    console.log();
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img );
  }

}
