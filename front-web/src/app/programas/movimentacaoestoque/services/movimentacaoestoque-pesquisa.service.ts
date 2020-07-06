import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class MovimentacaoEstoquePesquisaService {

  constructor(private http: HttpClient) { }

  listarMovimentacoes(): {label: string, value: string}[] {
    return [
      { label: 'Selecione', value: 'SELECIONE' },
      { label: 'Entrada', value: 'ENTRADA' },
      { label: 'Saída', value: 'SAIDA' }
    ];
  }

  pesquisar(valor: any, pagina = 1): Observable<any> {
    const url = `${environment.apiURL}/movimentaestoque/pesquisa`;
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
