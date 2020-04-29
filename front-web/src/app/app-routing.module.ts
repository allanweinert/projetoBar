import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'entradaproduto',
    loadChildren: () => import('./programas/entradadeproduto/entradaproduto.module').then(mod => mod.EntradaProdutoModule),
  },
  {
    path: 'fornecedor',
    loadChildren: () => import('./programas/fornecedor/fornecedor.module').then(mod => mod.FornecedorModule),
  },
  {
    path: 'unidademedida',
    loadChildren: () => import('./programas/unidadedemedida/unidademedida.module').then(mod => mod.UnidadeMedidaModule),
  },
  {
    path: 'categoria',
    loadChildren: () => import('./programas/categoria/categoria.module').then(mod => mod.CategoriaModule),
  },
  {
    path: 'produto',
    loadChildren: () => import('./programas/produto/produto.module').then(mod => mod.ProdutoModule),
  },
  {
    path: 'municipio',
    loadChildren: () => import('./programas/municipio/municipio.module').then(mod => mod.MunicipioModule),
  },
  {
    path: 'pessoa',
    loadChildren: () => import('./programas/pessoa/pessoa.module').then(mod => mod.PessoaModule),
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pagina-inicial/pagina-inicial.module').then(mod => mod.PaginaInicialModule),
  },
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
