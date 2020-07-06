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
import { CardModule } from 'primeng/card';
import {MatIconModule} from '@angular/material/icon';

import {MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule} from '@angular/material';


import { CategoriaFormComponent } from './formulario/categoria-form.component';
import { CategoriaPesquisaComponent } from './pesquisa/categoria-pesquisa.component';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = [
  { path: 'pesquisa',  component: CategoriaPesquisaComponent },
  { path: 'novo',  component: CategoriaFormComponent },
  { path: ':id',  component: CategoriaFormComponent }
];

@NgModule({
  declarations: [CategoriaPesquisaComponent, CategoriaFormComponent],
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
    CardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class CategoriaModule { }
