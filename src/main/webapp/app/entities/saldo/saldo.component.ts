import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISaldo } from 'app/shared/model/saldo.model';
import { SaldoService } from './saldo.service';
import { SaldoDeleteDialogComponent } from './saldo-delete-dialog.component';

@Component({
  selector: 'jhi-saldo',
  templateUrl: './saldo.component.html',
})
export class SaldoComponent implements OnInit, OnDestroy {
  saldos?: ISaldo[];
  eventSubscriber?: Subscription;

  constructor(protected saldoService: SaldoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.saldoService.query().subscribe((res: HttpResponse<ISaldo[]>) => (this.saldos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSaldos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISaldo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSaldos(): void {
    this.eventSubscriber = this.eventManager.subscribe('saldoListModification', () => this.loadAll());
  }

  delete(saldo: ISaldo): void {
    const modalRef = this.modalService.open(SaldoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.saldo = saldo;
  }
}
