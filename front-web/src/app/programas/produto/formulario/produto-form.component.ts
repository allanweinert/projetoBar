import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

import { Produto } from "../modelos/produto";

import { ProdutoCrudService } from "../services/produto-crud.service";
import { ProdutoPesquisaService } from "../services/produto-pesquisa.service";
import { CategoriaPesquisaService } from "../../categoria/services/categoria-pesquisa.service";

@Component({
  selector: "app-produto-form",
  templateUrl: "./produto-form.component.html",
  styleUrls: ["./produto-form.component.css"],
  providers: [
    ProdutoCrudService,
    ProdutoPesquisaService,
    CategoriaPesquisaService,
  ],
  animations: [
    trigger("exibeComponente", [
      state("ready", style({ opacity: 1 })),
      transition("void => ready", [
        style({ opacity: 0, transform: "translate(-30px, -10px" }),
        animate("300ms 0s ease-in-out"),
      ]),
    ]),
  ],
})
export class ProdutoFormComponent implements OnInit {
  situacao = [];
  categorias = [];
  formProduto: FormGroup;
  editando = false;
  estadoComponente = "ready";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private produtoPesquisaService: ProdutoPesquisaService,
    private produtoCrudService: ProdutoCrudService,
    public categoriaPesquisaService: CategoriaPesquisaService
  ) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.situacao = this.produtoPesquisaService.listarSituacao();
    this.verificarParametroRota();
  }

  configurarFormulario() {
    this.formProduto = this.formBuilder.group({
      id: "",
      nome: ["", Validators.required],
      categoria: "",
      estoque_minimo: "",
      situacao: "",
    });
    this.formProduto.get("id").disable();
  }

  pesquisarCategorias(pesquisa) {
    this.categoriaPesquisaService
      .pesquisar(pesquisa.query)
      .subscribe((resultadoado) => {
        this.categorias = resultadoado.data;
      });
  }

  verificarParametroRota(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id) {
      this.carregarProduto(id);
    } else {
      this.novo();
    }
  }

  carregarProduto(id: number) {
    this.produtoCrudService.carregar(id).subscribe((produto) => {
      this.formProduto.patchValue(produto);
      this.editando = true;
    });
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
        severity: "warn",
        summary: "Não é possível salvar o produto!",
        detail: "Verifique o preenchimento dos campos e tente novamente.",
      });
    }
  }

  atualizarProduto(produto: Produto) {
    this.produtoCrudService.atualizar(produto).subscribe((produtoId) => {
      this.messageService.add({
        severity: "success",
        summary: "Sucesso!",
        detail: "Produto " + produto.nome + " alterada com sucesso!",
      });
      this.pesquisar();
    });
  }

  incluirProduto(produto: Produto) {
    this.produtoCrudService.incluir(produto).subscribe(
      (produtoId) => {
        this.messageService.add({
          severity: "success",
          summary: "Sucesso!",
          detail: "Produto " + produto.nome + " incluído com sucesso!",
        });
        this.pesquisar();
      },
      (error) => {
        this.messageService.add({
          severity: "warn",
          summary: "Não foi possível salvar o Produto!",
          detail: JSON.stringify(error),
        });
      }
    );
  }

  validarFormulario() {
    this.formProduto.markAsDirty();
    this.formProduto.updateValueAndValidity();
    return this.formProduto.valid;
  }

  excluir() {
    const id = this.formProduto.get("id").value;
    const confirmacao = confirm("Deseja excluir este produto ?");
    if (confirmacao) {
      this.produtoCrudService.deletar(id).subscribe((resultado) => {
        this.messageService.add({
          severity: "success",
          summary: "Sucesso!",
          detail: "Produto excluído com sucesso!",
        });
        this.novo();
      });
    }
  }

  novo() {
    this.editando = false;
    this.formProduto.reset({
      situacao: "ATIVO",
    });
    this.router.navigate(["/produto/novo"]);
  }

  cancelar() {
    const id = this.formProduto.get("id").value;
    if (id) {
      this.carregarProduto(id);
    } else {
      this.novo();
    }
  }

  pesquisar() {
    this.router.navigate(["/produto/pesquisa"]);
  }
}
