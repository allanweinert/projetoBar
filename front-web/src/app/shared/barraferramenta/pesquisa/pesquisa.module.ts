import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import { PesquisaComponent } from './pesquisa.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PesquisaComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  exports: [
    PesquisaComponent,
  ],
})
export class PesquisaModule { }
