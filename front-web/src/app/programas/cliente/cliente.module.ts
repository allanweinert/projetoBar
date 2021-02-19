import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { CardModule } from 'primeng/card';

import { CarrinhoModule } from './carrinho/carrinho.module';
import { ListaProdutoModule } from './lista-produto/lista-produto.module';

const routes: Routes = [
  { path: '',  component: ClienteComponent }
];

@NgModule({
  declarations: [ClienteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule,
    CarrinhoModule,
    ListaProdutoModule,
  ]
})
export class ClienteModule { }
