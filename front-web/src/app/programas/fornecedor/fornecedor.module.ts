import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorPesquisaComponent } from './pesquisa/fornecedor-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { FornecedorFormComponent } from './formulario/fornecedor-form.component';

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
import { CardModule } from 'primeng/card';

import { TelefoneModule } from 'src/app/shared/telefone/telefone.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

const routes: Routes = [
  { path: 'pesquisa',  component: FornecedorPesquisaComponent },
  { path: 'novo',  component: FornecedorFormComponent },
  { path: ':id',  component: FornecedorFormComponent }
];

@NgModule({
  declarations: [FornecedorPesquisaComponent, FornecedorFormComponent],
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
    TelefoneModule,
    CardModule,
    ProgressSpinnerModule
  ]
})
export class FornecedorModule { }
