import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Pessoa } from '../modelos/pessoa';
import { environment } from 'src/environments/environment';

@Injectable()
export class PessoaCrudService {

  constructor(private http: HttpClient) { }

  carregar(id: number) {
    const url = `${environment.apiURL}/pessoa/${id}`;
    return this.http.get<Pessoa>(url).pipe(
      tap(
        pessoa => {
          if (pessoa.nascimento) {
            // TODO: Arrumar
            // NÃO SEI A FORMA MAIS SIMPLES DE RESOLVER AINDA... HAHAHAHA
            pessoa.nascimento = new Date(pessoa.nascimento);
            pessoa.nascimento.setDate(pessoa.nascimento.getDate() + 1);
          }
          return of(pessoa);
        }
      )
    );
  }

  incluir(pessoa: Pessoa) {
    const url = `${environment.apiURL}/pessoa`;
    return this.http.post<Pessoa>(url, pessoa).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(pessoa: Pessoa) {
    const url = `${environment.apiURL}/pessoa`;
    return this.http.put<Pessoa>(url, pessoa).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletar(id: number) {
    const url = `${environment.apiURL}/pessoa/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

}
