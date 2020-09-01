import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UsuarioService } from './../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean  {
    return this.usuarioService.validarToken()
                .pipe(
                  tap( estaAutenticado => {
                      if ( !estaAutenticado ){
                         this.router.navigateByUrl('/login');
                      }
                  })
                );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // console.log('Paso por Auht Guard');
      return this.usuarioService.validarToken()
                .pipe(
                  tap( estaAutenticado => {
                      if ( !estaAutenticado ){
                         this.router.navigateByUrl('/login');
                      }
                  })
                );
  }

}
