import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { UnidadeMedida } from '../modelos/unidademedida';
import { environment } from 'src/environments/environment';

@Injectable()
export class UnidadeMedidaCrudService {

  constructor(private http: HttpClient) { }

  carregar(id: number) {
    const url = `${environment.apiURL}/unidademedida/${id}`;
    return this.http.get<UnidadeMedida>(url).pipe(
      tap(
        unidademedida => {
          return of(unidademedida);
        }
      )
    );
  }

  incluir(unidademedida: UnidadeMedida) {
    const url = `${environment.apiURL}/unidademedida`;
    return this.http.post<UnidadeMedida>(url, unidademedida).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(unidademedida: UnidadeMedida) {
    const url = `${environment.apiURL}/unidademedida`;
    return this.http.put<UnidadeMedida>(url, unidademedida).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletar(id: number) {
    const url = `${environment.apiURL}/unidademedida/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

}
