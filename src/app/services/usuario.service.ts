import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { Usuario } from './../models/usuario.model';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from './../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers(): any {
    return {
      headers: { 'x-token': this.token }
    };
  }


  cargarUsuarios( desde: number = 0 ): any {
    const url = `${ base_url }/usuarios?desde=${ desde }`;
    // return this.http.get<{total: number; usuarios: Usuario }>(url, this.headers )
    return this.http.get<CargarUsuario>( url, this.headers )
            .pipe(
              map( resp => {
                console.log(resp);
                const usuarios = resp.usuarios.map(
                  user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
                );
                return {
                  total: resp.total,
                  usuarios
                };
              })
            );
  }

  guardarUsuario( usuario: Usuario ): any {
    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );
  }

  eliminarUsuario( usuario: Usuario ): any {
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );
  }

  crearUsuario( formData: RegisterForm ): Observable<any> {
    return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token );
                })
              );
  }

  actualizarPerfil( data: { email: string, nombre: string, role: string } ): Observable<object> {
    data = {
      ...data,
      role: this.usuario.role
    };
    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers );
  }

  login( formData: LoginForm ): Observable<any> {
    return this.http.post(`${ base_url }/login`, formData )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token );
                  })
                );
  }

  validarToken(): any {
    return this.http.get(`${ base_url }/login/renew`, {
      headers: { 'x-token': this.token }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img = '', uid} = resp.usuario;
        // Instancia de la clase
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        this.usuario.imprimirUsuario();
        localStorage.setItem('token', resp.token );
        return true;
      }),
      catchError( error => of(false) )
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    /*this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });*/
  }

  // Login de google
  loginGoogle( token: any ): Observable<any> {
    return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token )
                  })
                );
  }

  googleInit(): Promise<unknown> {
    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '412714738437-qv0827bfroeji7qsbinf8tm0jo9f5dqg.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

}
