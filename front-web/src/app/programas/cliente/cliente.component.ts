import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Produto } from "../produto/modelos/produto";
import { ProdutoPesquisaService } from "../produto/services/produto-pesquisa.service";

@Component({
  selector: "app-cliente",
  templateUrl: "./cliente.component.html",
  styleUrls: ["./cliente.component.css"],
  providers: [ProdutoPesquisaService],
})
export class ClienteComponent implements OnInit {
  produtos = [];

  @Input() produto: Produto
  @Output() add = new EventEmitter()

  constructor(private produtoPesquisaService: ProdutoPesquisaService) {}

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.produtoPesquisaService
      .pesquisar(this.produtos)
      .subscribe((resultado) => {
        this.produtos = resultado.data;
      });
  }

  emitAddEvent(){
    this.add.emit(this.produto)
  }
}
