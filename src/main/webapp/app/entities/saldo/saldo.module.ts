import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FinanceiroSharedModule } from 'app/shared/shared.module';
import { SaldoComponent } from './saldo.component';
import { SaldoDetailComponent } from './saldo-detail.component';
import { SaldoUpdateComponent } from './saldo-update.component';
import { SaldoDeleteDialogComponent } from './saldo-delete-dialog.component';
import { saldoRoute } from './saldo.route';

@NgModule({
  imports: [FinanceiroSharedModule, RouterModule.forChild(saldoRoute)],
  declarations: [SaldoComponent, SaldoDetailComponent, SaldoUpdateComponent, SaldoDeleteDialogComponent],
  entryComponents: [SaldoDeleteDialogComponent],
})
export class FinanceiroSaldoModule {}
