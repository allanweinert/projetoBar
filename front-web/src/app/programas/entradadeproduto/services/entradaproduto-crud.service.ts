import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EntradaProduto } from '../modelos/entrada-produto';
import { environment } from 'src/environments/environment';

@Injectable()
export class EntradaProdutoCrudService {

  constructor(private http: HttpClient) { }

  carregar(id: number) {
    const url = `${environment.apiURL}/entradaproduto/${id}`;
    return this.http.get<EntradaProduto>(url).pipe(
      tap(
        entradaproduto => {
          if (entradaproduto.dataentrada) {
            entradaproduto.dataentrada = new Date(entradaproduto.dataentrada);
            entradaproduto.dataentrada.setDate(entradaproduto.dataentrada.getDate() + 1);
          }
          return of(entradaproduto);
        }
      )
    );
  }

  incluir(entradaproduto: EntradaProduto) {
    const url = `${environment.apiURL}/entradaproduto`;
    return this.http.post<EntradaProduto>(url, entradaproduto).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(entradaproduto: EntradaProduto) {
    const url = `${environment.apiURL}/entradaproduto`;
    return this.http.put<EntradaProduto>(url, entradaproduto).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletar(id: number) {
    const url = `${environment.apiURL}/entradaproduto/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

}
