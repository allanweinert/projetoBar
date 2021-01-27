import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarrinhoComponent } from './carrinho.component';



@NgModule({
  declarations: [CarrinhoComponent],
  exports: [CarrinhoComponent],
  imports: [
    CommonModule
  ]
})
export class CarrinhoModule { }
