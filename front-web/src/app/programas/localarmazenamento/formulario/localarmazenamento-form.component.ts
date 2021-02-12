import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';


import { LocalArmazenamentoCrudService } from '../services/localarmazenamento-crud.service';
import { LocalArmazenamento } from '../modelos/localarmazenamento';
import { LocalArmazenamentoPesquisaService } from '../services/localarmazenamento-pesquisa.service';

@Component({
  selector: 'app-localarmazenamento-form',
  templateUrl: './localarmazenamento-form.component.html',
  styleUrls: ['./localarmazenamento-form.component.css'],
  providers: [
    LocalArmazenamentoCrudService,
    LocalArmazenamentoPesquisaService
  ]
})

export class LocalArmazenamentoFormComponent implements OnInit {
  situacao = [];
  formArmazenamento: FormGroup;
  editando = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private localArmazenamentoPesquisaService: LocalArmazenamentoPesquisaService,
              private localArmazenamentoCrudService: LocalArmazenamentoCrudService) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.situacao = this.localArmazenamentoPesquisaService.listarSituacao();
    this.verificarParametroRota();
  }

  configurarFormulario() {
    this.formArmazenamento = this.formBuilder.group({
      id: '',
      nome: ['', Validators.required],
      situacao: ''
    });
    this.formArmazenamento.get('id').disable();
  }


  verificarParametroRota(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarArmazenamento(id);
    } else {
      this.novo();
    }
  }

  carregarArmazenamento(id: number) {
    this.localArmazenamentoCrudService.carregar(id).subscribe(
      armazenamento => {
        this.formArmazenamento.patchValue(armazenamento);
        this.editando = true;
      }
    );
  }

  getArmazenamentoDoForm(): LocalArmazenamento {
    const armazenamento = this.formArmazenamento.getRawValue();
    return armazenamento;
  }

  salvar() {
    if (this.validarFormulario()) {
      const armazenamento: LocalArmazenamento = this.getArmazenamentoDoForm();
      if (armazenamento.id) {
        this.atualizarArmazenamento(armazenamento);
      } else {
        this.incluirArmazenamento(armazenamento);
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Não é possível salvar o local de armazenamento!',
        detail: 'Verifique o preenchimento dos campos e tente novamente.'
      });
    }
  }

  atualizarArmazenamento(armazenamento: LocalArmazenamento) {
    this.localArmazenamentoCrudService.atualizar(armazenamento).subscribe(
      armazenamentoId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Local ' + armazenamento.nome + ' alterado com sucesso!'
        });
        this.pesquisar();
      }
    );
  }

  incluirArmazenamento(armazenamento: LocalArmazenamento) {
    this.localArmazenamentoCrudService.incluir(armazenamento).subscribe(
      armazenamentoId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Local ' + armazenamento.nome + ' incluído com sucesso!'
        });
        this.pesquisar();
      },
      error => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Não foi possível salvar a Local de Armazenamento!',
          detail: JSON.stringify(error)
        });
      }
    );
  }

  validarFormulario() {
    this.formArmazenamento.markAsDirty();
    this.formArmazenamento.updateValueAndValidity();
    return this.formArmazenamento.valid;
  }

  novo() {
    this.editando = false;
    this.formArmazenamento.reset({
      situacao: 'ATIVO'
    });
    this.router.navigate(['/localarmazenamento/novo']);
  }

  excluir() {
    const id = this.formArmazenamento.get('id').value;
    const confirmacao = confirm('Deseja excluir este local ?');
    if (confirmacao) {
      this.localArmazenamentoCrudService.deletar(id).subscribe(
        resultado => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Local de Armazenamento excluído com sucesso!'
          });
          this.novo();
        }
      );
    }
  }

  cancelar() {
    const id = this.formArmazenamento.get('id').value;
    if (id) {
      this.carregarArmazenamento(id);
    } else {
      this.novo();
    }
  }

  pesquisar() {
    this.router.navigate(['/localarmazenamento/pesquisa']);
  }

}
