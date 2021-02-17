import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { ProdutoPesquisaService } from "../services/produto-pesquisa.service";

@Component({
  selector: "app-produto-pesquisa",
  templateUrl: "./produto-pesquisa.component.html",
  styleUrls: ["./produto-pesquisa.component.css"],
  providers: [ProdutoPesquisaService],
})
export class ProdutoPesquisaComponent implements OnInit {
  produtos: any;
  formPesquisa: FormGroup;

  constructor(
    private produtoPesquisaService: ProdutoPesquisaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formPesquisa = this.formBuilder.group({
      valorPesquisa: [""],
    });
  }

  ngOnInit() {
    this.pesquisar();
  }

  incluir() {
    this.router.navigate(["/produto/novo"]);
  }

  pesquisar() {
    const valorPesquisa = this.formPesquisa.get("valorPesquisa").value;
    this.produtoPesquisaService
      .pesquisar(valorPesquisa)
      .subscribe((resultado) => {
        this.produtos = resultado.data;
      });
  }

  limparPesquisa() {
    this.formPesquisa.get("valorPesquisa").setValue("");
    this.pesquisar();
  }
}
