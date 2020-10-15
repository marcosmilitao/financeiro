import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimentacao } from 'app/shared/model/movimentacao.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { MovimentacaoService } from 'app/entities/movimentacao/movimentacao.service';
// import { MovimentacaoDeleteDialogComponent } from './movimentacao-delete-dialog.component';

import { ICliente } from 'app/shared/model/cliente.model';

@Component({
  selector: 'jhi-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.scss'],
})
export class MovimentacaoComponent implements OnInit, OnDestroy {
  movimentacaos?: IMovimentacao[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  saldoId = 0;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  cliente: ICliente | null = null;
  constructor(
    protected homeService: MovimentacaoService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => (this.cliente = cliente));

    let cli;
    if (this.cliente) {
      cli = this.cliente;
      if (cli.saldo) {
        if (cli.saldo.id !== undefined) {
          this.saldoId = cli.saldo.id;
        } else {
          this.saldoId = 0;
        }
      } else {
        this.saldoId = 0;
      }
    } else {
      this.saldoId = 0;
    }

    this.homeService.findBySaldoId(this.saldoId).subscribe((res: HttpResponse<IMovimentacao[]>) => (this.movimentacaos = res.body || []));
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
}
