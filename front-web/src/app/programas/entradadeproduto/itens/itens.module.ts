import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';


import { ItensComponent } from './itens.component';

@NgModule({
  declarations: [ItensComponent],
  exports: [ItensComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    AutoCompleteModule,
    TableModule
  ]
})
export class ItensModule { }
