import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISaldo } from 'app/shared/model/saldo.model';
import { SaldoService } from './saldo.service';

@Component({
  templateUrl: './saldo-delete-dialog.component.html',
})
export class SaldoDeleteDialogComponent {
  saldo?: ISaldo;

  constructor(protected saldoService: SaldoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.saldoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('saldoListModification');
      this.activeModal.close();
    });
  }
}
