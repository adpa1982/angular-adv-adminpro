import { Pipe, PipeTransform } from '@angular/core';

import { environment } from './../../environments/environment.prod';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {

    let image = `${ base_url }/upload/usuarios/no-image`;

    if ( img ) {
       image =  `${ base_url }/upload/${ tipo }/${ img }`;
    }
    return image;
  }

}
