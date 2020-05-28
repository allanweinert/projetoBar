import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Categoria } from '../../categoria/modelos/categoria';
import { UnidadeMedida } from '../../unidademedida/modelos/unidademedida';

@Injectable()
export class ProdutoPesquisaService {

  constructor(private http: HttpClient) { }

  listarSituacao(): {label: string, value: string}[] {
    return [
      { label: 'Ativo', value: 'ATIVO' },
      { label: 'Inativo', value: 'INATIVO' }
    ];
  }

  listarUnidadeMedida(): Observable<UnidadeMedida[]> {
    const url = `${environment.apiURL}/unidademedida/tudo`;
    return this.http.get<UnidadeMedida[]>(url).pipe(
      tap(
        unm => {
          return of(unm);
        }
      )
    );
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
}
