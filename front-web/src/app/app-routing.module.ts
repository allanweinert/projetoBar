import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  /**
   * Path: Define o caminho da URL para a rota.
   * Component: Define o componente que o Angular deve usar para o caminho correspondente.
   */
  {
    path: 'cliente',
    loadChildren: () => import('./programas/cliente/cliente.module').then(mod => mod.ClienteModule),
  },
  {
    path: 'localarmazenamento',
    loadChildren: () => import('./programas/localarmazenamento/localarmazenamento.module').then(mod => mod.LocalArmazenamentoModule),
  },
  {
    path: 'movimentacaoestoque',
    loadChildren: () => import('./programas/movimentacaoestoque/movimentacaoestoque.module').then(mod => mod.MovimentacaoEstoqueModule),
  },
  {
    path: 'fornecedor',
    loadChildren: () => import('./programas/fornecedor/fornecedor.module').then(mod => mod.FornecedorModule),
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
  /**
   * Rota Padrão
   * pathMatch: full = Informa ao roteador como combinar a URL com o caminho de um rota.
   */
  {
     path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  {
    /**
     * Rota Curinga: Quando a solicitação não bater com nenhuma rota acima, esta rota é selecionada.
     */
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
