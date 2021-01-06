import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-pesquisa",
  templateUrl: "./pesquisa.component.html",
  styleUrls: ["./pesquisa.component.css"],
})
export class PesquisaComponent implements OnInit {
  //Output: Emite eventos para o componente pai.
  @Output() onClickIncluir: EventEmitter<any> = new EventEmitter();
  @Output() onClickPesquisar: EventEmitter<any> = new EventEmitter();
  @Output() onClickLimparPesquisa: EventEmitter<any> = new EventEmitter();

  @Input() form: FormGroup;
  @Input() param: string;

  constructor() {}

  ngOnInit(): void {}

  incluir(): void {
    this.onClickIncluir.emit();
  }

  pesquisar(): void {
    this.onClickPesquisar.emit();
  }

  limparPesquisa(): void {
    this.onClickLimparPesquisa.emit();
  }
}
