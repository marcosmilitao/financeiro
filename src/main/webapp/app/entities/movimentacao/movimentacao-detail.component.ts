import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovimentacao } from 'app/shared/model/movimentacao.model';

@Component({
  selector: 'jhi-movimentacao-detail',
  templateUrl: './movimentacao-detail.component.html',
})
export class MovimentacaoDetailComponent implements OnInit {
  movimentacao: IMovimentacao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimentacao }) => (this.movimentacao = movimentacao));
  }

  previousState(): void {
    window.history.back();
  }
}
