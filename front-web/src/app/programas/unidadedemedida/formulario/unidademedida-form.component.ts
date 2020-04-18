import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { UnidadeMedidaCrudService } from '../services/unidademedida-crud.service';
import { UnidadeMedida } from '../modelos/unidademedida';
import { UnidadeMedidaPesquisaService } from '../services/unidademedida-pesquisa.service';


@Component({
  selector: 'app-unidademedida-form',
  templateUrl: './unidademedida-form.component.html',
  styleUrls: ['./unidademedida-form.component.css'],
  providers: [
    UnidadeMedidaCrudService,
    UnidadeMedidaPesquisaService
  ]
})
export class UnidadeMedidaFormComponent implements OnInit {

  ptBR;

  situacao = [];
  unidademedida = [];
  formUnidadeMedida: FormGroup;
  editando = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private unidadeMedidaPesquisaService: UnidadeMedidaPesquisaService,
              private unidadeMedidaCrudService: UnidadeMedidaCrudService) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.situacao = this.unidadeMedidaPesquisaService.listarSituacao();
    this.verificarParametroRota();
  }

  configurarFormulario() {
    this.formUnidadeMedida = this.formBuilder.group({
      id: '',
      nome: ['', Validators.required],
      situacao: ''
    });
    this.formUnidadeMedida.get('id').disable();
  }


  verificarParametroRota(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarUnidadeMedida(id);
    } else {
      this.novo();
    }
  }

  carregarUnidadeMedida(id: number) {
    this.unidadeMedidaCrudService.carregar(id).subscribe(
      unidademedida => {
        this.formUnidadeMedida.patchValue(unidademedida);
        this.editando = true;
      }
    );
  }

  getUnidadeMedidaDoForm(): UnidadeMedida {
    const unidademedida = this.formUnidadeMedida.getRawValue();
    return unidademedida;
  }

  salvar() {
    if (this.validarFormulario()) {
      const unidademedida: UnidadeMedida = this.getUnidadeMedidaDoForm();
      if (unidademedida.id) {
        this.atualizarUnidadeMedida(unidademedida);
      } else {
        this.incluirUnidadeMedida(unidademedida);
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Não é possível salvar a unidade de medida!',
        detail: 'Verifique o preenchimento dos campos e tente novamente.'
      });
    }
  }

  atualizarUnidadeMedida(unidademedida: UnidadeMedida) {
    this.unidadeMedidaCrudService.atualizar(unidademedida).subscribe(
      unidademedidaId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Unidade ' + unidademedida.nome + ' alterada com sucesso!'
        });
      }
    );
  }

  incluirUnidadeMedida(unidademedida: UnidadeMedida) {
    this.unidadeMedidaCrudService.incluir(unidademedida).subscribe(
      unidademedidaId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Unidade ' + unidademedida.nome + ' incluída com sucesso!'
        });
        this.novo();
      },
      error => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Não foi possível salvar a Unidade de Medida!',
          detail: JSON.stringify(error)
        });
      }
    );
  }

  validarFormulario() {
    this.formUnidadeMedida.markAsDirty();
    this.formUnidadeMedida.updateValueAndValidity();
    return this.formUnidadeMedida.valid;
  }

  novo() {
    this.editando = false;
    this.formUnidadeMedida.reset({
      situacao: 'ATIVO'
    });
    this.router.navigate(['/unidademedida/novo']);
  }

  cancelar() {
    const id = this.formUnidadeMedida.get('id').value;
    if (id) {
      this.carregarUnidadeMedida(id);
    } else {
      this.novo();
    }
  }

}
