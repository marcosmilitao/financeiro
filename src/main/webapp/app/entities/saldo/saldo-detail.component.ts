import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISaldo } from 'app/shared/model/saldo.model';

@Component({
  selector: 'jhi-saldo-detail',
  templateUrl: './saldo-detail.component.html',
})
export class SaldoDetailComponent implements OnInit {
  saldo: ISaldo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ saldo }) => (this.saldo = saldo));
  }

  previousState(): void {
    window.history.back();
  }
}
