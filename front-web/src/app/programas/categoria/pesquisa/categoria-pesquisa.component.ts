import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { CategoriaPesquisaService } from "../services/categoria-pesquisa.service";

@Component({
  selector: "app-categoria-pesquisa",
  templateUrl: "./categoria-pesquisa.component.html",
  styleUrls: ["./categoria-pesquisa.component.css"],
  providers: [CategoriaPesquisaService],
})
export class CategoriaPesquisaComponent implements OnInit {
  formPesquisa: FormGroup;
  categorias: any;
  editando: boolean;

  constructor(
    private categoriaPesquisaService: CategoriaPesquisaService,
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
    this.router.navigate(["/categoria/novo"]);
  }

  pesquisar() {
    const valorPesquisa = this.formPesquisa.get("valorPesquisa").value;
    this.categoriaPesquisaService
      .pesquisar(valorPesquisa)
      .subscribe((resultado) => {
        this.categorias = resultado.data;
      });
  }

  limparPesquisa() {
    this.formPesquisa.get("valorPesquisa").setValue("");
    this.pesquisar();
  }
}
