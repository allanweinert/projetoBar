import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Categoria } from '../../categoria/modelos/categoria';

@Injectable()
export class ProdutoPesquisaService {

  constructor(private http: HttpClient) { }

  listarSituacao(): {label: string, value: string}[] {
    return [
      { label: 'Ativo', value: 'ATIVO' },
      { label: 'Inativo', value: 'INATIVO' }
    ];
  }

  listarCategoria(): Observable<Categoria[]> {
    const url = `${environment.apiURL}/categoria/tudo`;
    return this.http.get<Categoria[]>(url).pipe(
      tap(
        cat => {
          return of(cat);
        }
      )
    );
  }

  pesquisar(valor: any, pagina = 1): Observable<any> {
    const url = `${environment.apiURL}/produto/pesquisa`;
    const options = {
      params: new HttpParams().set('valor', valor).set('pagina', String(pagina))
    };
    return this.http.get<any>(url, options).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  pesquisaComSaldo(valor: any): Observable<any> {
    const url = `${environment.apiURL}/produto/pesquisacomsaldo`;
    const options = {
      params: new HttpParams().set('valor', valor)
    };
    return this.http.get<any>(url, options).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  pesquisaProdutoComSaldoPorLocalArmazenamento(localArmazenamentoId: number, pagina = 1): Observable<any> {
    const url = `${environment.apiURL}/produto/pesquisaprodutocomsaldoporlocalarmazenamento`;
    const options = {
      params: new HttpParams().set('localArmazenamentoId', localArmazenamentoId.toString()).set('pagina', String(pagina))
    };
    return this.http.get<any>(url, options).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }
}
