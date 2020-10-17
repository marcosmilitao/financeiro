import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMovimentacao } from 'app/shared/model/movimentacao.model';
import { MovimentacaoService } from './movimentacao.service';

@Component({
  templateUrl: './movimentacao-delete-dialog.component.html',
})
export class MovimentacaoDeleteDialogComponent {
  movimentacao?: IMovimentacao;

  constructor(
    protected movimentacaoService: MovimentacaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.movimentacaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('movimentacaoListModification');
      this.activeModal.close();
    });
  }
}
