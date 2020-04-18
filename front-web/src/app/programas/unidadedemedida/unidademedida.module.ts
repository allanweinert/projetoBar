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

import { UnidadeMedidaPesquisaComponent } from './pesquisa/unidademedida-pesquisa.component';
import { UnidadeMedidaFormComponent } from './formulario/unidademedida-form.component';

const routes: Routes = [
  { path: 'pesquisa',  component: UnidadeMedidaPesquisaComponent },
  { path: 'novo',  component: UnidadeMedidaFormComponent },
  { path: ':id',  component: UnidadeMedidaFormComponent }
];

@NgModule({
  declarations: [UnidadeMedidaPesquisaComponent, UnidadeMedidaFormComponent],
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
    InputMaskModule
  ]
})
export class UnidadeMedidaModule { }
