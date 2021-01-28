import { Component, OnInit } from "@angular/core";
import { CategoriaPesquisaService } from "../categoria/services/categoria-pesquisa.service";

@Component({
  selector: "app-cliente",
  templateUrl: "./cliente.component.html",
  styleUrls: ["./cliente.component.css"],
  providers: [CategoriaPesquisaService],
})
export class ClienteComponent implements OnInit {
  categorias = [];


  constructor(private categoriaPesquisaService: CategoriaPesquisaService) {}

  ngOnInit() {
    this.pesquisarCategorias();
  }

  pesquisarCategorias() {
    this.categoriaPesquisaService
    .pesquisar(this.categorias)
    .subscribe(
      resultado => {
        this.categorias = resultado.data;
      }
    );
  }
}
