import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FinanceiroSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { CreditoComponent } from './credito/credito.component';
import { DebitoComponent } from './debito/debito.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { MovimentacaoComponent } from './movimentacao/movimentacao.component';
import { PesquisaPipe } from './pesquisa.pipe';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [FinanceiroSharedModule, RouterModule.forChild(HOME_ROUTE), NgxCurrencyModule, NgxMaskModule.forRoot()],
  declarations: [HomeComponent, CreditoComponent, DebitoComponent, MovimentacaoComponent, PesquisaPipe],
})
export class FinanceiroHomeModule {}
