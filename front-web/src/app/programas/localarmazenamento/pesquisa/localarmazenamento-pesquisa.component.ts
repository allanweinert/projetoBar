import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


import { LocalArmazenamentoPesquisaService } from '../services/localarmazenamento-pesquisa.service';

@Component({
  selector: 'app-localarmazenamento-pesquisa',
  templateUrl: './localarmazenamento-pesquisa.component.html',
  styleUrls: ['./localarmazenamento-pesquisa.component.css'],
  providers: [LocalArmazenamentoPesquisaService],
})
export class LocalArmazenamentoPesquisaComponent implements OnInit {

  armazenamentos: any = [];
  formPesquisa: FormGroup;
  pesquisando = false;


  constructor(
    private localArmazenamentoPesquisaService: LocalArmazenamentoPesquisaService,
    private formBuilder: FormBuilder
  ) {
    this.formPesquisa = this.formBuilder.group({
      valorPesquisa: [''],
    });
  }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.pesquisando = true;
    const valorPesquisa = this.formPesquisa.get('valorPesquisa').value;
    this.localArmazenamentoPesquisaService.pesquisar(valorPesquisa).subscribe(
      resultado => {
        this.armazenamentos = resultado.data;
        this.pesquisando = false;
      }
    );
  }

  limparPesquisa() {
    this.formPesquisa.get('valorPesquisa').setValue('');
    this.pesquisar();
  }

}

