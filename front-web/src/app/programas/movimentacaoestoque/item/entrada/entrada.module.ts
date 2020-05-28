import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import {KeyFilterModule} from 'primeng/keyfilter';

import { EntradaComponent } from './entrada.component';

@NgModule({
  declarations: [EntradaComponent],
  exports: [EntradaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    AutoCompleteModule,
    TableModule,
    KeyFilterModule,
    CurrencyMaskModule,
  ]
})
export class EntradaModule { }
