import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Categoria } from '../modelos/categoria';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoriaCrudService {

  constructor(private http: HttpClient) { }

  carregar(id: number) {
    const url = `${environment.apiURL}/categoria/${id}`;
    return this.http.get<Categoria>(url).pipe(
      tap(
        categoria => {
          return of(categoria);
        }
      )
    );
  }

  incluir(categoria: Categoria) {
    const url = `${environment.apiURL}/categoria`;
    return this.http.post<Categoria>(url, categoria).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(categoria: Categoria) {
    const url = `${environment.apiURL}/categoria`;
    return this.http.put<Categoria>(url, categoria).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletar(id: number) {
    const url = `${environment.apiURL}/categoria/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

}
