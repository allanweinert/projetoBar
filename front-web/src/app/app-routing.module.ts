import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'movimentacaoestoque',
    loadChildren: () => import('./programas/movimentacaoestoque/movimentacaoestoque.module').then(mod => mod.MovimentacaoEstoqueModule),
  },
  {
    path: 'fornecedor',
    loadChildren: () => import('./programas/fornecedor/fornecedor.module').then(mod => mod.FornecedorModule),
  },
  {
    path: 'unidademedida',
    loadChildren: () => import('./programas/unidademedida/unidademedida.module').then(mod => mod.UnidadeMedidaModule),
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
