import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimentacao } from 'app/shared/model/movimentacao.model';
import { MovimentacaoService } from './movimentacao.service';
import { MovimentacaoDeleteDialogComponent } from './movimentacao-delete-dialog.component';

@Component({
  selector: 'jhi-movimentacao',
  templateUrl: './movimentacao.component.html',
})
export class MovimentacaoComponent implements OnInit, OnDestroy {
  movimentacaos?: IMovimentacao[];
  eventSubscriber?: Subscription;

  constructor(
    protected movimentacaoService: MovimentacaoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.movimentacaoService.query().subscribe((res: HttpResponse<IMovimentacao[]>) => (this.movimentacaos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMovimentacaos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMovimentacao): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMovimentacaos(): void {
    this.eventSubscriber = this.eventManager.subscribe('movimentacaoListModification', () => this.loadAll());
  }

  delete(movimentacao: IMovimentacao): void {
    const modalRef = this.modalService.open(MovimentacaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.movimentacao = movimentacao;
  }
}
