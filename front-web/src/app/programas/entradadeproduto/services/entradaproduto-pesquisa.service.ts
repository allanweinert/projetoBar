import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EntradaProduto } from '../modelos/entrada-produto';

@Injectable()
export class EntradaProdutoPesquisaService {

  constructor(private http: HttpClient) { }

  pesquisar(valor: any, pagina = 1): Observable<any> {
    const url = `${environment.apiURL}/entradaproduto/pesquisa`;
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
