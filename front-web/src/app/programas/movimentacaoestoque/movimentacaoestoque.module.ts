import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputMaskModule } from 'primeng/inputmask';

import { MovimentacaoEstoqueFormComponent } from './formulario/movimentacaoestoque-form.component';
import { MovimentacaoEstoquePesquisaComponent } from './pesquisa/movimentacaoestoque-pesquisa.component';

import { EntradaModule } from './item/entrada/entrada.module';
import { SaidaModule } from './item/saida/saida.module';



const routes: Routes = [
  { path: 'pesquisa',  component: MovimentacaoEstoquePesquisaComponent },
  { path: 'novo',  component: MovimentacaoEstoqueFormComponent },
  { path: ':id',  component: MovimentacaoEstoqueFormComponent }
];

@NgModule({
  declarations: [MovimentacaoEstoquePesquisaComponent, MovimentacaoEstoqueFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    PanelModule,
    TableModule,
    ToastModule,
    CalendarModule,
    AutoCompleteModule,
    InputMaskModule,
    EntradaModule,
    SaidaModule,
  ]
})
export class MovimentacaoEstoqueModule { }
