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


import { LocalArmazenamentoFormComponent } from './formulario/localarmazenamento-form.component';
import { LocalArmazenamentoPesquisaComponent } from './pesquisa/localarmazenamento-pesquisa.component';
import { BarraFerramentaModule } from 'src/app/shared/barraferramenta/barraferramenta.module';
import { PesquisaModule } from 'src/app/shared/barraferramenta/pesquisa/pesquisa.module';


const routes: Routes = [
  { path: 'pesquisa',  component: LocalArmazenamentoPesquisaComponent },
  { path: 'novo',  component: LocalArmazenamentoFormComponent },
  { path: ':id',  component: LocalArmazenamentoFormComponent }
];

@NgModule({
  declarations: [LocalArmazenamentoPesquisaComponent, LocalArmazenamentoFormComponent],
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
    BarraFerramentaModule,
    PesquisaModule,

  ]
})
export class LocalArmazenamentoModule { }
