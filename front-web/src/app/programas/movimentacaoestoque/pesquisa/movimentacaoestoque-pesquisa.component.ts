import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MovimentacaoEstoquePesquisaService } from '../services/movimentacaoestoque-pesquisa.service';

@Component({
  selector: 'app-movimentacaoestoque-pesquisa',
  templateUrl: './movimentacaoestoque-pesquisa.component.html',
  styleUrls: ['./movimentacaoestoque-pesquisa.component.css'],
  providers: [
    MovimentacaoEstoquePesquisaService
  ]
})
export class MovimentacaoEstoquePesquisaComponent implements OnInit {

  entradas: any;
  formPesquisa: FormGroup;
  pesquisando = false;

  constructor(private movimentaEstoquePesquisaService: MovimentacaoEstoquePesquisaService, private formBuilder: FormBuilder) {
    this.formPesquisa = this.formBuilder.group({
      valorPesquisa: ['']
    });
  }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.pesquisando = true;
    const valorPesquisa = this.formPesquisa.get('valorPesquisa').value;
    this.movimentaEstoquePesquisaService.pesquisar(valorPesquisa).subscribe(
      resultado => {
        this.entradas = resultado.data;
        this.pesquisando = false;
      }
    );
  }

  limparPesquisa() {
    this.formPesquisa.get('valorPesquisa').setValue('');
    this.pesquisar();
  }

  getDescricaoTipo(tipoValor: string): string {
    const tipo = this.movimentaEstoquePesquisaService.listarMovimentacoes().find(tipo => tipo.value === tipoValor);
    return tipo.label;
  }

}
