import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { UnidadeMedidaPesquisaService } from '../services/unidademedida-pesquisa.service';

@Component({
  selector: 'app-unidademedida-pesquisa',
  templateUrl: './unidademedida-pesquisa.component.html',
  styleUrls: ['./unidademedida-pesquisa.component.css'],
  providers: [
    UnidadeMedidaPesquisaService
  ]
})
export class UnidadeMedidaPesquisaComponent implements OnInit {

  unidademedidas: any;
  formPesquisa: FormGroup;
  pesquisando = false;

  constructor(private unidadeMedidaPesquisaService: UnidadeMedidaPesquisaService, private formBuilder: FormBuilder) {
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
    this.unidadeMedidaPesquisaService.pesquisar(valorPesquisa).subscribe(
      resultado => {
        this.unidademedidas = resultado.data;
        this.pesquisando = false;
      }
    );
  }

  limparPesquisa() {
    this.formPesquisa.get('valorPesquisa').setValue('');
    this.pesquisar();
  }

}
