import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';


import { SaidaComponent } from './saida.component';
import {CurrencyMaskModule} from "ng2-currency-mask";

@NgModule({
  declarations: [SaidaComponent],
  exports: [SaidaComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        ButtonModule,
        AutoCompleteModule,
        TableModule,
        CurrencyMaskModule
    ]
})
export class SaidaModule { }
