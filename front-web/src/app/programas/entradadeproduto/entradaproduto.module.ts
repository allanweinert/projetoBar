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

import { EntradaProdutoFormComponent } from './formulario/entradaproduto-form.component';
import { EntradaProdutoPesquisaComponent } from './pesquisa/entradaproduto-pesquisa.component';
import { ItensModule } from './itens/itens.module';

const routes: Routes = [
  { path: 'pesquisa',  component: EntradaProdutoPesquisaComponent },
  { path: 'novo',  component: EntradaProdutoFormComponent },
  { path: ':id',  component: EntradaProdutoFormComponent }
];

@NgModule({
  declarations: [EntradaProdutoPesquisaComponent, EntradaProdutoFormComponent],
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
    ItensModule,
  ]
})
export class EntradaProdutoModule { }
