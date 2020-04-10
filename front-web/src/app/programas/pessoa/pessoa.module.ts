import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaPesquisaComponent } from './pesquisa/pessoa-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { PessoaFormComponent } from './formulario/pessoa-form.component';
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
import { TelefoneModule } from 'src/app/shared/telefone/telefone.module';

const routes: Routes = [
  { path: 'pesquisa',  component: PessoaPesquisaComponent },
  { path: 'novo',  component: PessoaFormComponent },
  { path: ':id',  component: PessoaFormComponent }
];

@NgModule({
  declarations: [PessoaPesquisaComponent, PessoaFormComponent],
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
    TelefoneModule
  ]
})
export class PessoaModule { }
