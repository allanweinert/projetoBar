import {Component, Input, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
})
export class CalendarioComponent {

  @Input() form: FormGroup;
  @Input() param: string;

  ptBR;

  constructor () {
    this.configurarCalendar();
  }

  configurarCalendar() {
    this.ptBR = {
      firstDayOfWeek: 0, // iniciar semana no domingo
      dayNames: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ],
      dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      monthNamesShort: [
        "jan",
        "fev",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
        "nov",
        "dez",
      ],
      today: "Hoje",
      clear: "Limpar",
    };
  }

}
