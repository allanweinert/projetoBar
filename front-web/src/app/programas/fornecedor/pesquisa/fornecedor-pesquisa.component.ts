import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { FornecedorPesquisaService } from "../services/fornecedor-pesquisa.service";

@Component({
  selector: "app-fornecedor-pesquisa",
  templateUrl: "./fornecedor-pesquisa.component.html",
  styleUrls: ["./fornecedor-pesquisa.component.css"],
  providers: [FornecedorPesquisaService],
})
export class FornecedorPesquisaComponent implements OnInit {
  fornecedores: any;
  formPesquisa: FormGroup;
  pesquisando = false;

  constructor(
    private fornecedorPesquisaService: FornecedorPesquisaService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.formPesquisa = this.formBuilder.group({
      valorPesquisa: [""],
    });
  }

  ngOnInit() {
    this.pesquisar();
  }

  incluir() {
    this.router.navigate(["/fornecedor/novo"]);
  }

  pesquisar() {
    this.pesquisando = true;
    const valorPesquisa = this.formPesquisa.get("valorPesquisa").value;
    this.fornecedorPesquisaService
      .pesquisar(valorPesquisa)
      .subscribe((resultado) => {
        this.fornecedores = resultado.data;
        this.pesquisando = false;
      });
  }

  limparPesquisa() {
    this.formPesquisa.get("valorPesquisa").setValue("");
    this.pesquisar();
  }
}
