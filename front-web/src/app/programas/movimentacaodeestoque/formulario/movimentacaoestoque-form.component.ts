import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { MovimentacaoEstoqueCrudService } from '../services/movimentacaoestoque-crud.service';
import { MovimentacaoEstoquePesquisaService } from '../services/movimentacaoestoque-pesquisa.service';
import { MovimentacaoEstoque } from '../modelos/movimentacaoestoque';


@Component({
  selector: 'app-movimentacaoestoque-form',
  templateUrl: './movimentacaoestoque-form.component.html',
  styleUrls: ['./movimentacaoestoque-form.component.css'],
  providers: [
    MovimentacaoEstoqueCrudService,
    MovimentacaoEstoquePesquisaService,
  ]
})
export class MovimentacaoEstoqueFormComponent implements OnInit {

  ptBR;

  tipoMovimentacoes = [];
  formMovimentacaoEstoque: FormGroup;
  editando = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private movimentacaoestoqueCrudService: MovimentacaoEstoqueCrudService,
              private movimentacaoestoquePesquisaService: MovimentacaoEstoquePesquisaService) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.tipoMovimentacoes = this.movimentacaoestoquePesquisaService.listarMovimentacoes();
    this.verificarParametroRota();
  }

  configurarFormulario() {
    this.formMovimentacaoEstoque = this.formBuilder.group({
      id: '',
      tipomovimentacao: ''
    });
    this.formMovimentacaoEstoque.get('id').disable();
  }

  verificarParametroRota(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarMovimentacaoEstoque(id);
    } else {
      this.novo();
    }
  }

  carregarMovimentacaoEstoque(id: number) {
    this.movimentacaoestoqueCrudService.carregar(id).subscribe(
      movimentacaoestoque => {
        this.formMovimentacaoEstoque.patchValue(movimentacaoestoque);
        this.editando = true;
      }
    );
  }

  getMovimentacaoEstoqueDoForm(): MovimentacaoEstoque {
    const movimentacaoestoque = this.formMovimentacaoEstoque.getRawValue();
    return movimentacaoestoque;
  }

  salvar() {
    /*
      Se o tipo de movimentação for igual a entrada
        ->Se a movimentação.entrada existe, atualiza;
        ->Se não existe incluí.
      Se o tipo de movimentação for igual a saída
        ->Se a movimentação.saída existe, atualiza;
        ->Se não existe incluí. 
    */

    if (this.validarFormulario()) {
      const movimentacaoestoque: MovimentacaoEstoque = this.getMovimentacaoEstoqueDoForm();
      if (movimentacaoestoque.id) {
        this.atualizarMovimentacaoEstoque(movimentacaoestoque);
      } else {
        this.incluirMovimentacaoEstoque(movimentacaoestoque);
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Não é possível salvar a Entrada!',
        detail: 'Verifique o preenchimento dos campos e tente novamente.'
      });
    }
  }

  atualizarMovimentacaoEstoque(movimentacaoestoque: MovimentacaoEstoque) {
    this.movimentacaoestoqueCrudService.atualizar(movimentacaoestoque).subscribe(
      entradaprodutoId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Entrada ' + movimentacaoestoque.id + ' alterado com sucesso!'
        });
      }
    );
  }

  incluirMovimentacaoEstoque(movimentacaoestoque: MovimentacaoEstoque) {
    this.movimentacaoestoqueCrudService.incluir(movimentacaoestoque).subscribe(
      movimentacaoestoqueId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Entrada incluída com sucesso!'
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
    this.formMovimentacaoEstoque.markAsDirty();
    this.formMovimentacaoEstoque.updateValueAndValidity();
    return this.formMovimentacaoEstoque.valid;
  }

  excluir() {
    const id = this.formMovimentacaoEstoque.get('id').value;
  }

  novo() {
    this.editando = false;
    this.formMovimentacaoEstoque.reset();
    this.router.navigate(['/movimentacaoestoque/novo']);
  }

  cancelar() {
    const id = this.formMovimentacaoEstoque.get('id').value;
    if (id) {
      this.carregarMovimentacaoEstoque(id);
    } else {
      this.novo();
    }
  }

}
