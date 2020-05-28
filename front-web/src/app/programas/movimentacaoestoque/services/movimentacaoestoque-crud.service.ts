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
    const url = `${environment.apiURL}/movimentaestoque/${id}`;
    return this.http.get<MovimentacaoEstoque>(url).pipe(
      tap(
        movimentaestoque => {
          if(movimentaestoque.data) {
            movimentaestoque.data = new Date(movimentaestoque.data);
            movimentaestoque.data.setDate(movimentaestoque.data.getDate() + 1);
          }
          return of(movimentaestoque);
        }
      )
    );
  }

  incluir(movimentaestoque: MovimentacaoEstoque) {
    const url = `${environment.apiURL}/movimentaestoque`;
    return this.http.post<MovimentacaoEstoque>(url, movimentaestoque).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(movimentaestoque: MovimentacaoEstoque) {
    const url = `${environment.apiURL}/movimentaestoque`;
    return this.http.put<MovimentacaoEstoque>(url, movimentaestoque).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletar(id: number) {
    const url = `${environment.apiURL}/movimentaestoque/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

}
