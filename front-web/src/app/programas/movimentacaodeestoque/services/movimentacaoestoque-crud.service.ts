import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovimentacaoEstoque } from '../modelos/movimentacaoestoque';
import { environment } from 'src/environments/environment';

@Injectable()
export class MovimentacaoEstoqueCrudService {

  constructor(private http: HttpClient) { }

  carregar(id: number) {
    const url = `${environment.apiURL}/movimentacaoestoque/${id}`;
    return this.http.get<MovimentacaoEstoque>(url).pipe(
      tap(
        movimentacaoestoque => {
          return of(movimentacaoestoque);
        }
      )
    );
  }

  incluir(movimentacaoestoque: MovimentacaoEstoque) {
    const url = `${environment.apiURL}/movimentacaoestoque`;
    return this.http.post<MovimentacaoEstoque>(url, movimentacaoestoque).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(movimentacaoestoque: MovimentacaoEstoque) {
    const url = `${environment.apiURL}/movimentacaoestoque`;
    return this.http.put<MovimentacaoEstoque>(url, movimentacaoestoque).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletar(id: number) {
    const url = `${environment.apiURL}/movimentacaoestoque/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

}
