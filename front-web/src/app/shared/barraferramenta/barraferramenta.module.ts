import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import { BarraFerramentaComponent } from './barraferramenta.component';



@NgModule({
  declarations: [
    BarraFerramentaComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule
  ],
  exports: [
    BarraFerramentaComponent,
  ],
})
export class BarraFerramentaModule { }
