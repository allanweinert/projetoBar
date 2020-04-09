import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Produto } from '../modelos/produto';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProdutoCrudService {

  constructor(private http: HttpClient) { }

  carregar(id: number) {
    const url = `${environment.apiURL}/produto/${id}`;
    return this.http.get<Produto>(url).pipe(
      tap(
        produto => {
          return of(produto);
        }
      )
    );
  }

  incluir(produto: Produto) {
    const url = `${environment.apiURL}/produto`;
    return this.http.post<Produto>(url, produto).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(produto: Produto) {
    const url = `${environment.apiURL}/produto`;
    return this.http.put<Produto>(url, produto).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletar(id: number) {
    const url = `${environment.apiURL}/produto/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

}
