import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { LocalArmazenamentoPesquisaService } from "../services/localarmazenamento-pesquisa.service";

@Component({
  selector: "app-localarmazenamento-pesquisa",
  templateUrl: "./localarmazenamento-pesquisa.component.html",
  styleUrls: ["./localarmazenamento-pesquisa.component.css"],
  providers: [LocalArmazenamentoPesquisaService],
})
export class LocalArmazenamentoPesquisaComponent implements OnInit {
  armazenamentos: any = [];
  formPesquisa: FormGroup;
  pesquisando = false;

  constructor(
    private localArmazenamentoPesquisaService: LocalArmazenamentoPesquisaService,
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
    this.router.navigate(["/localarmazenamento/novo"]);
  }

  pesquisar() {
    this.pesquisando = true;
    const valorPesquisa = this.formPesquisa.get("valorPesquisa").value;
    this.localArmazenamentoPesquisaService
      .pesquisar(valorPesquisa)
      .subscribe((resultado) => {
        this.armazenamentos = resultado.data;
        this.pesquisando = false;
      });
  }

  limparPesquisa() {
    this.formPesquisa.get("valorPesquisa").setValue("");
    this.pesquisar();
  }
}
