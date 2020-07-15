import { Component, OnInit } from '@angular/core';
import { DashboardPesquisaService } from './dashboard/services/dashboard-pesquisa.service';
import { FormGroupName, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css'],
  providers: [
    DashboardPesquisaService
  ]
})
export class PaginaInicialComponent implements OnInit {
  saldos: any

  constructor(private dashboardPesquisaService: DashboardPesquisaService) {}

  ngOnInit() {
    this.carregarSaldo();
  }

  carregarSaldo() {
    this.dashboardPesquisaService.saldoEstoque().subscribe((saldos: any) =>{
      this.saldos = saldos;
    });
  }

}
