import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.FinanceiroClienteModule),
      },
      {
        path: 'saldo',
        loadChildren: () => import('./saldo/saldo.module').then(m => m.FinanceiroSaldoModule),
      },
      {
        path: 'movimentacao',
        loadChildren: () => import('./movimentacao/movimentacao.module').then(m => m.FinanceiroMovimentacaoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class FinanceiroEntityModule {}
