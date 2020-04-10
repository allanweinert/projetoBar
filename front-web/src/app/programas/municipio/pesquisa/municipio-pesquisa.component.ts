import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MunicipioPesquisaService } from '../services/municipio-pesquisa.service';

@Component({
  selector: 'app-municipio-pesquisa',
  templateUrl: './municipio-pesquisa.component.html',
  styleUrls: ['./municipio-pesquisa.component.css'],
  providers: [
    MunicipioPesquisaService
  ]
})
export class MunicipioPesquisaComponent implements OnInit {

  municipios: any;
  formPesquisa: FormGroup;
  pesquisando = false;

  constructor(private municipioPesquisaService: MunicipioPesquisaService, private formBuilder: FormBuilder) {
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
    this.municipioPesquisaService.pesquisar(valorPesquisa).subscribe(
      resultado => {
        this.municipios = resultado.data;
        this.pesquisando = false;
      }
    );
  }

  limparPesquisa() {
    this.formPesquisa.get('valorPesquisa').setValue('');
    this.pesquisar();
  }

}
