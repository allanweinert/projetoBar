import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoPesquisaComponent } from './pesquisa/produto-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoFormComponent } from './formulario/produto-form.component';
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

const routes: Routes = [
  { path: 'pesquisa',  component: ProdutoPesquisaComponent },
  { path: 'novo',  component: ProdutoFormComponent },
  { path: ':id',  component: ProdutoFormComponent }
];

@NgModule({
  declarations: [ProdutoPesquisaComponent, ProdutoFormComponent],
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
export class ProdutoModule { }
