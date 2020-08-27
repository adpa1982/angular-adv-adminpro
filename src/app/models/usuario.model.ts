import { environment } from './../../environments/environment';

const base_url = environment.base_url;

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ){}

  imprimirUsuario(): void {
    console.log( this.nombre );
  }

  get imagenUrl(): string {
    let image = `${ base_url }/upload/usuarios/no-image`;

    /*if ( this.img.includes('https') ) {
       return this.img;
    } */
    if ( this.google ) {
       return image;
    }

    if ( this.img ) {
       image =  `${ base_url }/upload/usuarios/${ this.img }`;
    }
    return image;
  }
}
