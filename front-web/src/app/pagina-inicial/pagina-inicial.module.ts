import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicialComponent } from './pagina-inicial.component';
import { RouterModule, Routes } from '@angular/router';
import { GraficoComponent } from './dashboard/graficos/grafico.component';
import { HighchartsChartModule } from 'highcharts-angular';

const routes: Routes = [
  { path: '',  component: PaginaInicialComponent }
];

@NgModule({
  declarations: [PaginaInicialComponent, GraficoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HighchartsChartModule,
    TableModule
  ]
})
export class PaginaInicialModule { }
