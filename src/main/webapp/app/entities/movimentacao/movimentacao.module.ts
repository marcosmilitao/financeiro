import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FinanceiroSharedModule } from 'app/shared/shared.module';
import { MovimentacaoComponent } from './movimentacao.component';
import { MovimentacaoDetailComponent } from './movimentacao-detail.component';
import { MovimentacaoUpdateComponent } from './movimentacao-update.component';
import { MovimentacaoDeleteDialogComponent } from './movimentacao-delete-dialog.component';
import { movimentacaoRoute } from './movimentacao.route';

@NgModule({
  imports: [FinanceiroSharedModule, RouterModule.forChild(movimentacaoRoute)],
  declarations: [MovimentacaoComponent, MovimentacaoDetailComponent, MovimentacaoUpdateComponent, MovimentacaoDeleteDialogComponent],
  entryComponents: [MovimentacaoDeleteDialogComponent],
})
export class FinanceiroMovimentacaoModule {}
