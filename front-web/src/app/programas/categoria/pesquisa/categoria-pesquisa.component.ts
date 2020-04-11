import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CategoriaPesquisaService } from '../services/categoria-pesquisa.service';

@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.component.html',
  styleUrls: ['./categoria-pesquisa.component.css'],
  providers: [
    CategoriaPesquisaService
  ]
})
export class CategoriaPesquisaComponent implements OnInit {

  categorias: any;
  formPesquisa: FormGroup;
  pesquisando = false;

  constructor(private categoriaPesquisaService: CategoriaPesquisaService, private formBuilder: FormBuilder) {
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
    this.categoriaPesquisaService.pesquisar(valorPesquisa).subscribe(
      resultado => {
        this.categorias = resultado.data;
        this.pesquisando = false;
      }
    );
  }

  limparPesquisa() {
    this.formPesquisa.get('valorPesquisa').setValue('');
    this.pesquisar();
  }

}
