import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';
import { Observable } from 'rxjs';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): any {
    return {
      headers: { 'x-token': this.token }
    };
  }

  cargarHospitales(): any  {
    const url = `${ base_url }/hospitales`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales )
                // map( resp => console.log(resp) )
              );
  }

  crearHospital( nombre: string ): Observable<any> {
    const url = `${ base_url }/hospitales`;
    return this.http.post( url, { nombre }, this.headers );
  }

  actualizarHospital( id: string, nombre: string  ): Observable<any> {
    const url = `${ base_url }/hospitales/${ id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarHospital( id: string ): Observable<any> {
    const url = `${ base_url }/hospitales/${ id }`;
    return this.http.delete( url, this.headers );
  }

}
