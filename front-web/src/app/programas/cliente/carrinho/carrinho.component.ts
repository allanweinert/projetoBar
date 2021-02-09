import { Component, OnInit } from "@angular/core";
import { CarrinhoService } from "./services/carrinho.service";

@Component({
  selector: "app-carrinho",
  templateUrl: "./carrinho.component.html",
  styleUrls: ["./carrinho.component.css"],
  providers: [CarrinhoService]
})
export class CarrinhoComponent implements OnInit {


  constructor( private carrinhoService: CarrinhoService) {}

  ngOnInit() {
  }

  items(): any[] {
    return this.carrinhoService.produtos;
  }

  adicionaItem(item: any) {
    this.carrinhoService.adicionaItem(item)
  }

}
