import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PessoaPesquisaService } from '../services/pessoa-pesquisa.service';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css'],
  providers: [
    PessoaPesquisaService
  ]
})
export class PessoaPesquisaComponent implements OnInit {

  pessoas: any;
  formPesquisa: FormGroup;
  pesquisando = false;

  constructor(private pessoaPesquisaService: PessoaPesquisaService, private formBuilder: FormBuilder) {
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
    this.pessoaPesquisaService.pesquisar(valorPesquisa).subscribe(
      resultado => {
        this.pessoas = resultado.data;
        this.pesquisando = false;
      }
    );
  }

  limparPesquisa() {
    this.formPesquisa.get('valorPesquisa').setValue('');
    this.pesquisar();
  }

  getDescricaoSexo(sexoValor: string): string {
    const sexo = this.pessoaPesquisaService.listarSexos().find(sexo => sexo.value === sexoValor);
    if (sexo) {
      return sexo.label;
    } else {
      return '';
    }
  }

}
