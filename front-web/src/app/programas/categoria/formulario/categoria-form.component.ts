import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { CategoriaCrudService } from '../services/categoria-crud.service';
import { Categoria } from '../modelos/categoria';
import { CategoriaPesquisaService } from '../services/categoria-pesquisa.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css'],
  providers: [
    CategoriaCrudService,
    CategoriaPesquisaService
  ]
})
export class CategoriaFormComponent implements OnInit {

  ptBR;

  situacao = [];
  unidademedida = [];
  formCategoria: FormGroup;
  editando = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private categoriaPesquisaService: CategoriaPesquisaService,
              private categoriaCrudService: CategoriaCrudService) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.situacao = this.categoriaPesquisaService.listarSituacao();
    this.verificarParametroRota();
  }

  configurarFormulario() {
    this.formCategoria = this.formBuilder.group({
      id: '',
      nome: ['', Validators.required],
      situacao: ''
    });
    this.formCategoria.get('id').disable();
  }


  verificarParametroRota(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarCategoria(id);
    } else {
      this.novo();
    }
  }

  carregarCategoria(id: number) {
    this.categoriaCrudService.carregar(id).subscribe(
      categoria => {
        this.formCategoria.patchValue(categoria);
        this.editando = true;
      }
    );
  }

  getCategoriaDoForm(): Categoria {
    const categoria = this.formCategoria.getRawValue();
    return categoria;
  }

  salvar() {
    if (this.validarFormulario()) {
      const categoria: Categoria = this.getCategoriaDoForm();
      if (categoria.id) {
        this.atualizarCategoria(categoria);
      } else {
        this.incluirCategoria(categoria);
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Não é possível salvar a categoria!',
        detail: 'Verifique o preenchimento dos campos e tente novamente.'
      });
    }
  }

  atualizarCategoria(categoria: Categoria) {
    this.categoriaCrudService.atualizar(categoria).subscribe(
      produtoId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Categoria ' + categoria.nome + ' alterada com sucesso!'
        });
      }
    );
  }

  incluirCategoria(categoria: Categoria) {
    this.categoriaCrudService.incluir(categoria).subscribe(
      categoriaId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Categoria ' + categoria.nome + ' incluída com sucesso!'
        });
        this.novo();
      },
      error => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Não foi possível salvar a Categoria!',
          detail: JSON.stringify(error)
        });
      }
    );
  }

  validarFormulario() {
    this.formCategoria.markAsDirty();
    this.formCategoria.updateValueAndValidity();
    return this.formCategoria.valid;
  }

  novo() {
    this.editando = false;
    this.formCategoria.reset({
      situacao: 'ATIVO'
    });
    this.router.navigate(['/categoria/novo']);
  }

  excluir() {
    const id = this.formCategoria.get('id').value;
    const confirmacao = confirm('Deseja excluir esta categoria ?');
    if (confirmacao) {
      this.categoriaCrudService.deletar(id).subscribe(
        resultado => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Categoria excluída com sucesso!'
          });
          this.novo();
        }
      );
    }
  }

  cancelar() {
    const id = this.formCategoria.get('id').value;
    if (id) {
      this.carregarCategoria(id);
    } else {
      this.novo();
    }
  }

}
