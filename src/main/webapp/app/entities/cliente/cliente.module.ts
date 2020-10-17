import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FinanceiroSharedModule } from 'app/shared/shared.module';
import { ClienteComponent } from './cliente.component';
import { ClienteDetailComponent } from './cliente-detail.component';
import { ClienteUpdateComponent } from './cliente-update.component';
import { ClienteDeleteDialogComponent } from './cliente-delete-dialog.component';
import { clienteRoute } from './cliente.route';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [FinanceiroSharedModule, RouterModule.forChild(clienteRoute), NgxCurrencyModule, NgxMaskModule.forRoot()],
  declarations: [ClienteComponent, ClienteDetailComponent, ClienteUpdateComponent, ClienteDeleteDialogComponent],
  entryComponents: [ClienteDeleteDialogComponent],
})
export class FinanceiroClienteModule {}
