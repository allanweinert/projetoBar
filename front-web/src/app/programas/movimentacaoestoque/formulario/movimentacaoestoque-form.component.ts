import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { MessageService } from "primeng/api";

import { MovimentacaoEstoqueCrudService } from "../services/movimentacaoestoque-crud.service";
import { MovimentacaoEstoquePesquisaService } from "../services/movimentacaoestoque-pesquisa.service";
import { FornecedorPesquisaService } from "../../fornecedor/services/fornecedor-pesquisa.service";
import { LocalArmazenamentoPesquisaService } from "../../localarmazenamento/services/localarmazenamento-pesquisa.service";

import { MovimentacaoEstoque } from "../modelos/movimentacaoestoque";
import { ItemEntrada } from "../modelos/item-entrada";
import { ItemSaida } from "../modelos/item-saida";
import { CalendarioComponent } from "src/app/shared/calendario/calendario.component";
import { TipoMovimentacao } from "../modelos/tipo-movimentacao.enum";
import { SaidaComponent } from "../item/saida/saida.component";
import { LocalArmazenamento } from "../../localarmazenamento/modelos/localarmazenamento";
import { Fornecedor } from "../../fornecedor/modelos/fornecedor";

@Component({
  selector: "app-movimentacaoestoque-form",
  templateUrl: "./movimentacaoestoque-form.component.html",
  styleUrls: ["./movimentacaoestoque-form.component.css"],
  providers: [
    MovimentacaoEstoqueCrudService,
    MovimentacaoEstoquePesquisaService,
    FornecedorPesquisaService,
    LocalArmazenamentoPesquisaService,
  ],
})
export class MovimentacaoEstoqueFormComponent implements OnInit {
  formMovimentacaoEstoque: FormGroup;

  tipoMovimentacoes = [];
  fornecedores = [];
  armazenamentos = [];
  listaEntrada: ItemEntrada[];
  listaSaida: ItemSaida[];

  TipoMovimentacao: typeof TipoMovimentacao = TipoMovimentacao;

  tipo: TipoMovimentacao;
  localArmazenamento: LocalArmazenamento;
  fornecedor: Fornecedor;
  showEntrada = false;
  showSaida = false;

  editando = false;

  @ViewChild(SaidaComponent) saidaComponent: SaidaComponent;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private movimentacaoestoqueCrudService: MovimentacaoEstoqueCrudService,
    private movimentacaoestoquePesquisaService: MovimentacaoEstoquePesquisaService,
    private fornecedorPesquisaService: FornecedorPesquisaService,
    private localarmazenamentoPesquisaService: LocalArmazenamentoPesquisaService
  ) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.tipoMovimentacoes = this.movimentacaoestoquePesquisaService.listarMovimentacoes();
    this.verificarParametroRota();
    this.onChanges();
  }

  configurarFormulario() {
    this.formMovimentacaoEstoque = this.formBuilder.group({
      id: "",
      tipo: ["", [Validators.required]],
      data: ["", [Validators.required]],
      fornecedor: "",
      localArmazenamento: "",
      localArmazenamentoDestino: "",
    });
    this.formMovimentacaoEstoque.get("id").disable();
  }

  verificarParametroRota(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id) {
      this.carregarMovimentacaoEstoque(id);
    } else {
      this.novo();
    }
  }

  carregarMovimentacaoEstoque(id: number) {
    this.movimentacaoestoqueCrudService
      .carregar(id)
      .subscribe((movimentacaoestoque) => {
        this.formMovimentacaoEstoque.patchValue(movimentacaoestoque);
        this.listaEntrada = movimentacaoestoque.itensEntrada;
        this.listaSaida = movimentacaoestoque.itensSaida;
        this.editando = true;
      });
  }

  getMovimentacaoEstoqueDoForm(): MovimentacaoEstoque {
    const movimentacaoestoque = this.formMovimentacaoEstoque.getRawValue();

    if (this.listaEntrada && this.listaEntrada.length > 0) {
      movimentacaoestoque.itensEntrada = this.listaEntrada;
    }
    if (this.listaSaida && this.listaSaida.length > 0) {
      movimentacaoestoque.itensSaida = this.listaSaida;
    }
    return movimentacaoestoque;
  }

  salvar() {
    if (this.validarFormulario()) {
      const movimentacaoestoque: MovimentacaoEstoque = this.getMovimentacaoEstoqueDoForm();
      if (movimentacaoestoque.id) {
        this.atualizarMovimentacaoEstoque(movimentacaoestoque);
      } else {
        this.incluirMovimentacaoEstoque(movimentacaoestoque);
      }
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Não é possível salvar a Entrada!",
        detail: "Verifique o preenchimento dos campos e tente novamente.",
      });
    }
  }

  atualizarMovimentacaoEstoque(movimentacaoestoque: MovimentacaoEstoque) {
    movimentacaoestoque.localArmazenamento = { id: 1 };
    this.movimentacaoestoqueCrudService
      .atualizar(movimentacaoestoque)
      .subscribe((entradaprodutoId) => {
        this.messageService.add({
          severity: "success",
          summary: "Sucesso!",
          detail:
            "Entrada " + movimentacaoestoque.id + " alterado com sucesso!",
        });
      });
  }

  incluirMovimentacaoEstoque(movimentacaoestoque: MovimentacaoEstoque) {
    movimentacaoestoque.localArmazenamento = { id: 1 };
    this.movimentacaoestoqueCrudService.incluir(movimentacaoestoque).subscribe(
      (movimentacaoestoqueId) => {
        this.messageService.add({
          severity: "success",
          summary: "Sucesso!",
          detail: "Entrada incluída com sucesso!",
        });
      },
      (error) => {
        this.messageService.add({
          severity: "warn",
          summary: "Não foi possível salvar a entrada!",
          detail: JSON.stringify(error),
        });
      }
    );
  }

  validarFormulario() {
    this.formMovimentacaoEstoque.markAsDirty();
    this.formMovimentacaoEstoque.updateValueAndValidity();
    return this.formMovimentacaoEstoque.valid;
  }

  //Início pesquisas
  pesquisarFornecedores(pesquisa) {
    this.fornecedorPesquisaService
      .pesquisar(pesquisa.query)
      .subscribe((resultadof) => {
        this.fornecedores = resultadof.data;
      });
  }

  pesquisarLocalArmazenamento(pesquisa) {
    this.localarmazenamentoPesquisaService
      .pesquisar(pesquisa.query)
      .subscribe((resultadol) => {
        this.armazenamentos = resultadol.data;
      });
  }
  //Fim de pesquisas

  excluir() {
    const id = this.formMovimentacaoEstoque.get("id").value;
  }

  novo() {
    this.editando = false;
    this.listaEntrada = [];
    this.listaSaida = [];
    this.formMovimentacaoEstoque.reset();
    this.formMovimentacaoEstoque.controls.data.setValue(new Date());
    this.router.navigate(["/movimentacaoestoque/novo"]);
  }

  cancelar() {
    const id = this.formMovimentacaoEstoque.get("id").value;
    if (id) {
      this.carregarMovimentacaoEstoque(id);
    } else {
      this.novo();
    }
  }

  onChangeTipo(): void {
    this.tipo = this.formMovimentacaoEstoque.get("tipo").value;
    this.showMovimentacao();
  }

  onChanges(): void {
    this.formMovimentacaoEstoque.valueChanges.subscribe((val) => {
      this.tipo = val["tipo"];
      this.fornecedor = val["fornecedor"];
      this.localArmazenamento = val["localArmazenamento"];
    });
  }

  showMovimentacao(): void {
    console.log(this.tipo)
    if (this.tipo === TipoMovimentacao.ENTRADA) {
      this.showSaida = false;
      this.formMovimentacaoEstoque.get("localArmazenamento").setValue(null)

      if (this.fornecedor) {
        this.showEntrada = true;

      }else this.showEntrada = false;
            
    } else if (this.tipo === TipoMovimentacao.SAIDA) {
      this.showEntrada = false;
      this.formMovimentacaoEstoque.get("fornecedor").setValue(null)


      if (this.localArmazenamento) {
        this.showSaida = true;
        this.saidaComponent.pesquisarProdutos();
      } else this.showSaida = false;
    } else {
      this.formMovimentacaoEstoque.get("localArmazenamento").setValue(null)
      this.formMovimentacaoEstoque.get("fornecedor").setValue(null)
      this.showEntrada = false;
      this.showSaida = false;
    }
  }
}
