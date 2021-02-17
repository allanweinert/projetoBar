import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-barraferramenta",
  templateUrl: "./barraferramenta.component.html",
  styleUrls: ["./barraferramenta.component.css"],
})
export class BarraFerramentaComponent implements OnInit {

  //Output: Emite eventos para o componente pai.

  @Output() onClickPesquisar: EventEmitter<any> = new EventEmitter();
  @Output() onClickSalvar: EventEmitter<any> = new EventEmitter();
  @Output() onClickCancelar: EventEmitter<any> = new EventEmitter();
  @Output() onClickExcluir: EventEmitter<any> = new EventEmitter();

  // Input: Recebe eventos enviados pelo componente pai.
  
  @Input() editando: boolean;

  constructor() {}

  ngOnInit(): void {}

  pesquisar(): void {
    this.onClickPesquisar.emit();
  }

  salvar(): void {
    this.onClickSalvar.emit();
  }

  cancelar(): void {
    this.onClickCancelar.emit();
  }

  excluir(): void {
    this.onClickExcluir.emit();
  }
}
