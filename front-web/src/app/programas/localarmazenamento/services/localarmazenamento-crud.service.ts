import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { LocalArmazenamento } from '../modelos/localarmazenamento';
import { environment } from 'src/environments/environment';

@Injectable()
export class LocalArmazenamentoCrudService {

  constructor(private http: HttpClient) { }

  carregar(id: number) {
    const url = `${environment.apiURL}/localarmazenamento/${id}`;
    return this.http.get<LocalArmazenamento>(url).pipe(
      tap(
        localArmazenamento => {
          return of(localArmazenamento);
        }
      )
    );
  }

  incluir(localarmazenamento: LocalArmazenamento) {
    const url = `${environment.apiURL}/localarmazenamento`;
    return this.http.post<LocalArmazenamento>(url, localarmazenamento).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(localarmazenamento: LocalArmazenamento) {
    const url = `${environment.apiURL}/localarmazenamento`;
    return this.http.put<LocalArmazenamento>(url, localarmazenamento).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletar(id: number) {
    const url = `${environment.apiURL}/localarmazenamento/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

}
