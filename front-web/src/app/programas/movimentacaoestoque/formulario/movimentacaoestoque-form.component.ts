import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { MessageService } from "primeng/api";

import { MovimentacaoEstoqueCrudService } from "../services/movimentacaoestoque-crud.service";
import { MovimentacaoEstoquePesquisaService } from "../services/movimentacaoestoque-pesquisa.service";
import { FornecedorPesquisaService } from "../../fornecedor/services/fornecedor-pesquisa.service";
import { LocalArmazenamentoPesquisaService } from '../../localarmazenamento/services/localarmazenamento-pesquisa.service';

import { MovimentacaoEstoque } from "../modelos/movimentacaoestoque";
import { ItemEntrada } from "../modelos/item-entrada";
import { ItemSaida } from "../modelos/item-saida";


@Component({
  selector: "app-movimentacaoestoque-form",
  templateUrl: "./movimentacaoestoque-form.component.html",
  styleUrls: ["./movimentacaoestoque-form.component.css"],
  providers: [
    MovimentacaoEstoqueCrudService,
    MovimentacaoEstoquePesquisaService,
    FornecedorPesquisaService,
    LocalArmazenamentoPesquisaService
  ],
})
export class MovimentacaoEstoqueFormComponent implements OnInit {
  ptBR;

  formMovimentacaoEstoque: FormGroup;

  tipoMovimentacoes = [];
  fornecedores = [];
  armazenamentos = [];
  listaEntrada: ItemEntrada[];
  listaSaida: ItemSaida[];

  dataAtual: Date;
  editando = false;

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
    this.configurarCalendar();
  }

  ngOnInit() {
    this.tipoMovimentacoes = this.movimentacaoestoquePesquisaService.listarMovimentacoes();
    this.verificarParametroRota();
    this.dataAtual = new Date();
  }

  configurarFormulario() {
    this.formMovimentacaoEstoque = this.formBuilder.group({
      id: "",
      tipo: ["", [Validators.required]],
      data: ["", [Validators.required]],
      fornecedor: "",
      localArmazenamento: "",
      localArmazenamentoDestino: ""
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

  configurarCalendar() {
    this.ptBR = {
      firstDayOfWeek: 0, // iniciar semana no domingo
      dayNames: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ],
      dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      monthNamesShort: [
        "jan",
        "fev",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
        "nov",
        "dez",
      ],
      today: "Hoje",
      clear: "Limpar",
    };
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
    movimentacaoestoque.data = new Date();

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
    movimentacaoestoque.localArmazenamento = {'id' : 1};
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
    movimentacaoestoque.localArmazenamento = {"id" : 1};
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

//Início Pesquisas
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

//Inicio Ações
  excluir() {
    const id = this.formMovimentacaoEstoque.get("id").value;
  }

  novo() {
    this.editando = false;
    this.listaEntrada = [];
    this.listaSaida = [];
    this.formMovimentacaoEstoque.reset();
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
}
