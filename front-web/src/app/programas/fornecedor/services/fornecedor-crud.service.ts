import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Fornecedor } from '../modelos/fornecedor';
import { environment } from 'src/environments/environment';

@Injectable()
export class FornecedorCrudService {

  constructor(private http: HttpClient) { }

  carregar(id: number) {
    const url = `${environment.apiURL}/fornecedor/${id}`;
    return this.http.get<Fornecedor>(url).pipe(
      tap(
        fornecedor => {
          return of(fornecedor);
        }
      )
    );
  }

  incluir(fornecedor: Fornecedor) {
    const url = `${environment.apiURL}/fornecedor`;
    return this.http.post<Fornecedor>(url, fornecedor).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(fornecedor: Fornecedor) {
    const url = `${environment.apiURL}/fornecedor`;
    return this.http.put<Fornecedor>(url, fornecedor).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletar(id: number) {
    const url = `${environment.apiURL}/fornecedor/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

}
