import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EntradaProdutoPesquisaService } from '../services/entradaproduto-pesquisa.service';

@Component({
  selector: 'app-entradaproduto-pesquisa',
  templateUrl: './entradaproduto-pesquisa.component.html',
  styleUrls: ['./entradaproduto-pesquisa.component.css'],
  providers: [
    EntradaProdutoPesquisaService
  ]
})
export class EntradaProdutoPesquisaComponent implements OnInit {

  entradas: any;
  formPesquisa: FormGroup;
  pesquisando = false;

  constructor(private entradaProdutoPesquisaService: EntradaProdutoPesquisaService, private formBuilder: FormBuilder) {
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
    this.entradaProdutoPesquisaService.pesquisar(valorPesquisa).subscribe(
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

}
