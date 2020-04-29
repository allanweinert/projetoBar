import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { EntradaProdutoCrudService } from '../services/entradaproduto-crud.service';
import { EntradaProduto } from '../modelos/entrada-produto';
import { EntradaProdutoPesquisaService } from '../services/entradaproduto-pesquisa.service';
import { FornecedorPesquisaService } from '../../fornecedor/services/fornecedor-pesquisa.service';

@Component({
  selector: 'app-entradaproduto-form',
  templateUrl: './entradaproduto-form.component.html',
  styleUrls: ['./entradaproduto-form.component.css'],
  providers: [
    EntradaProdutoCrudService,
    EntradaProdutoPesquisaService,
    FornecedorPesquisaService
  ]
})
export class EntradaProdutoFormComponent implements OnInit {

  ptBR;

  fornecedores = [];
  listaItens = [];
  formEntradaProduto: FormGroup;
  editando = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private entradaprodutoCrudService: EntradaProdutoCrudService,
              private fornecedorPesquisaService: FornecedorPesquisaService) {
    this.configurarFormulario();
    this.configurarCalendar();
  }

  ngOnInit() {
    this.verificarParametroRota();
  }

  configurarFormulario() {
    this.formEntradaProduto = this.formBuilder.group({
      id: '',
      fornecedor: '',
      dataentrada:'',
    });
    this.formEntradaProduto.get('id').disable();
  }


  pesquisarFornecedores(pesquisa) {
    this.fornecedorPesquisaService.pesquisar(pesquisa.query).subscribe(
      resultadof => {
        this.fornecedores = resultadof.data;
      }
    );
  }

  configurarCalendar() {
    this.ptBR = {
      firstDayOfWeek: 0, // iniciar semana no domingo
      dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
      dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
      dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
      monthNamesShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  verificarParametroRota(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarEntradaProduto(id);
    } else {
      this.novo();
    }
  }

  carregarEntradaProduto(id: number) {
    this.entradaprodutoCrudService.carregar(id).subscribe(
      entradaproduto => {
        this.formEntradaProduto.patchValue(entradaproduto);
        this.editando = true;
      }
    );
  }

  getEntradaProdutoDoForm(): EntradaProduto {
    const entradaproduto = this.formEntradaProduto.getRawValue();
    return entradaproduto;
  }

  salvar() {
    if (this.validarFormulario()) {
      const entradaproduto: EntradaProduto = this.getEntradaProdutoDoForm();
      if (entradaproduto.id) {
        this.atualizarEntradaProduto(entradaproduto);
      } else {
        this.incluirEntradaProduto(entradaproduto);
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Não é possível salvar a Entrada!',
        detail: 'Verifique o preenchimento dos campos e tente novamente.'
      });
    }
  }

  atualizarEntradaProduto(entradaproduto: EntradaProduto) {
    this.entradaprodutoCrudService.atualizar(entradaproduto).subscribe(
      entradaprodutoId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Entrada ' + entradaproduto.id + ' alterado com sucesso!'
        });
      }
    );
  }

  incluirEntradaProduto(entradaproduto: EntradaProduto) {
    this.entradaprodutoCrudService.incluir(entradaproduto).subscribe(
      entradaprodutoId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Entrada ' + entradaproduto.id + ' incluído com sucesso!'
        });
      },
      error => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Não foi possível salvar a entrada!',
          detail: JSON.stringify(error)
        });
      }
    );
  }

  validarFormulario() {
    this.formEntradaProduto.markAsDirty();
    this.formEntradaProduto.updateValueAndValidity();
    return this.formEntradaProduto.valid;
  }

  excluir() {
    const id = this.formEntradaProduto.get('id').value;
  }

  novo() {
    this.editando = false;
    this.listaItens = [];
    this.formEntradaProduto.reset();
    this.router.navigate(['/entradaproduto/novo']);
  }

  cancelar() {
    const id = this.formEntradaProduto.get('id').value;
    if (id) {
      this.carregarEntradaProduto(id);
    } else {
      this.novo();
    }
  }

}
