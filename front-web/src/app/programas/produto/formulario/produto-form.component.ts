import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProdutoCrudService } from '../services/produto-crud.service';
import { Produto } from '../modelos/produto';
import { ProdutoPesquisaService } from '../services/produto-pesquisa.service';
import { CategoriaPesquisaService } from '../../categoria/services/categoria-pesquisa.service';
import { UnidadeMedidaPesquisaService } from '../../unidadedemedida/services/unidademedida-pesquisa.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css'],
  providers: [
    ProdutoCrudService,
    ProdutoPesquisaService,
    CategoriaPesquisaService,
    UnidadeMedidaPesquisaService
  ]
})
export class ProdutoFormComponent implements OnInit {

  ptBR;

  situacao = [];
  unidademedidas = [];
  categorias = [];
  formProduto: FormGroup;
  editando = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private produtoPesquisaService: ProdutoPesquisaService,
              private produtoCrudService: ProdutoCrudService,
              public categoriaPesquisaService: CategoriaPesquisaService,
              public unidadeMedidaPesquisaService: UnidadeMedidaPesquisaService
              ) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.situacao = this.produtoPesquisaService.listarSituacao();
    this.verificarParametroRota();
  }

  configurarFormulario() {
    this.formProduto = this.formBuilder.group({
      id: '',
      nome: ['', Validators.required],
      categoria: '',
      unidademedida: ['', Validators.required],
      estoque_minimo: '',
      situacao: ''
    });
    this.formProduto.get('id').disable();
  }

  pesquisarUnidadeMedida(pesquisa) {
    this.unidadeMedidaPesquisaService.pesquisar(pesquisa.query).subscribe(
      unm => {
        this.unidademedidas = unm.data;
      }
    );
  }

  pesquisarCategorias(pesquisa) {
    this.categoriaPesquisaService.pesquisar(pesquisa.query).subscribe(
      resultadoado => {
        this.categorias = resultadoado.data;
      }
    );
  }

  verificarParametroRota(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarProduto(id);
    } else {
      this.novo();
    }
  }

  carregarProduto(id: number) {
    this.produtoCrudService.carregar(id).subscribe(
      produto => {
        this.formProduto.patchValue(produto);
        this.editando = true;
      }
    );
  }

  getProdutoDoForm(): Produto {
    const produto = this.formProduto.getRawValue();
    return produto;
  }

  salvar() {
    if (this.validarFormulario()) {
      const produto: Produto = this.getProdutoDoForm();
      if (produto.id) {
        this.atualizarProduto(produto);
      } else {
        this.incluirProduto(produto);
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Não é possível salvar o produto!',
        detail: 'Verifique o preenchimento dos campos e tente novamente.'
      });
    }
  }

  atualizarProduto(produto: Produto) {
    this.produtoCrudService.atualizar(produto).subscribe(
      produtoId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Produto ' + produto.nome + ' alterada com sucesso!'
        });
      }
    );
  }

  incluirProduto(produto: Produto) {
    this.produtoCrudService.incluir(produto).subscribe(
      produtoId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Produto ' + produto.nome + ' incluído com sucesso!'
        });
      },
      error => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Não foi possível salvar o Produto!',
          detail: JSON.stringify(error)
        });
      }
    );
  }

  validarFormulario() {
    this.formProduto.markAsDirty();
    this.formProduto.updateValueAndValidity();
    return this.formProduto.valid;
  }

 /* excluir() {
    const id = this.formProduto.get('id').value;
    const confirmacao = confirm('Deseja excluir o Município ' + id + '?');
    if (confirmacao) {
      this.produtoCrudService.deletar(id).subscribe(
        resultado => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Município ' + id + ' excluído com sucesso!'
          });
          this.novo();
        }
      );
    }
  }*/

  novo() {
    this.editando = false;
    this.formProduto.reset({
      situacao: 'ATIVO'
    });
    this.router.navigate(['/produto/novo']);
  }

  cancelar() {
    const id = this.formProduto.get('id').value;
    if (id) {
      this.carregarProduto(id);
    } else {
      this.novo();
    }
  }

}
