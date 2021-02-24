import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";

import { ProdutoPesquisaService } from "../../../produto/services/produto-pesquisa.service";

import { ItemEntrada } from "../../modelos/item-entrada";

@Component({
  selector: "app-entrada",
  templateUrl: "./entrada.component.html",
  styleUrls: ["./entrada.component.css"],
  providers: [MessageService, ProdutoPesquisaService],
})
export class EntradaComponent implements OnInit {
  @Input() itensEntrada: ItemEntrada[] = [];
  @Input() show: boolean;

  formEntrada: FormGroup;

  produtos = [];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private produtoPesquisaService: ProdutoPesquisaService
  ) {
    this.configurarFormEntrada();
  }

  ngOnInit() {
    this.novo();
  }

  configurarFormEntrada() {
    this.formEntrada = this.formBuilder.group({
      id: "",
      produto: ["", [Validators.required]],
      quantidade: ["", [Validators.required]],
      valorUnitario: ["", [Validators.required]],
      total: ["", [Validators.required]],
    });
  }

  pesquisarProdutos(pesquisa) {
    this.produtoPesquisaService
      .pesquisar(pesquisa.query)
      .subscribe((resultadop) => {
        this.produtos = resultadop.data;
      });
  }

  novo() {
    this.formEntrada.reset();
  }

  //Multiplicação do item
  totalItem() {
    this.formEntrada
      .get("total")
      .setValue(
        this.formEntrada.get("quantidade").value *
          this.formEntrada.get("valorUnitario").value
      );
  }

  adicionarItem() {
    const novoItem = this.formEntrada.getRawValue();
    const itemExistente = this.itensEntrada.find(
      (t) => novoItem.produto.id === t.produto.id
    );
    if (this.formEntrada.valid) {
      if (itemExistente) {
        alert("Item já cadastrado!");
        this.messageService.add({
          severity: "warn",
          summary: "Não é possível adicionar esse item!",
          detail: "Número " + novoItem.nome + " já cadastrado.",
        });
      } else {
        this.itensEntrada.push(novoItem);
        this.novo();
      }
    }
  }

  removerItem(indiceItem) {
    this.itensEntrada.splice(indiceItem, 1);
  }
}
