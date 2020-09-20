import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { MessageService } from "primeng/api";

import { ProdutoPesquisaService } from "../../../produto/services/produto-pesquisa.service";
import { ItemSaida } from "../../modelos/item-saida";
import { LocalArmazenamento } from 'src/app/programas/localarmazenamento/modelos/localarmazenamento';

@Component({
  selector: "app-saida",
  templateUrl: "./saida.component.html",
  styleUrls: ["./saida.component.css"],
  providers: [MessageService, ProdutoPesquisaService],
})
export class SaidaComponent implements OnInit {
  @Input() itensSaida: ItemSaida[] = [];
  @Input() localArmazenamento: LocalArmazenamento;
  @Input() show: boolean;

  formSaida: FormGroup;

  produtos = [];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private produtoPesquisaService: ProdutoPesquisaService
  ) {
    this.configurarFormSaida();
  }

  ngOnInit() {
    this.novo();
  }

  configurarFormSaida() {
    this.formSaida = this.formBuilder.group({
      id: ["", [Validators.required]],
      produto: ["", [Validators.required]],
      quantidade: ["", [Validators.required]],
      valorUnitario: ["", [Validators.required]],
      total: ""
    });
  }

  pesquisarProdutos(pesquisa?: any) {
    this.produtoPesquisaService
      .pesquisaProdutoComSaldoPorLocalArmazenamento(this.localArmazenamento.id)
      .subscribe((resultado) => {
        this.produtos = resultado.data;
      });
  }

  novo() {
    this.formSaida.reset();
  }

  //Multiplicação do item
  totalItem() {
    this.formSaida
      .get("total")
      .setValue(
        this.formSaida.get("quantidade").value *
          this.formSaida.get("valorUnitario").value
      );
  }

  adicionarItem() {
    const novoItem = this.formSaida.getRawValue();
    this.itensSaida.push(novoItem);
  }

  removerItem(indiceItem) {
    this.itensSaida.splice(indiceItem, 1);
  }
}
