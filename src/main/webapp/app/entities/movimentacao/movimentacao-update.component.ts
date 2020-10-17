import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMovimentacao, Movimentacao } from 'app/shared/model/movimentacao.model';
import { MovimentacaoService } from './movimentacao.service';
import { ISaldo } from 'app/shared/model/saldo.model';
import { SaldoService } from 'app/entities/saldo/saldo.service';

@Component({
  selector: 'jhi-movimentacao-update',
  templateUrl: './movimentacao-update.component.html',
})
export class MovimentacaoUpdateComponent implements OnInit {
  isSaving = false;
  saldos: ISaldo[] = [];

  editForm = this.fb.group({
    id: [],
    valor: [null, [Validators.required]],
    data: [],
    tipoMovimento: [],
    usuario: [],
    descricao: [],
    saldo: [],
  });

  constructor(
    protected movimentacaoService: MovimentacaoService,
    protected saldoService: SaldoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimentacao }) => {
      if (!movimentacao.id) {
        const today = moment().startOf('day');
        movimentacao.data = today;
      }

      this.updateForm(movimentacao);

      this.saldoService.query().subscribe((res: HttpResponse<ISaldo[]>) => (this.saldos = res.body || []));
    });
  }

  updateForm(movimentacao: IMovimentacao): void {
    this.editForm.patchValue({
      id: movimentacao.id,
      valor: movimentacao.valor,
      data: movimentacao.data ? movimentacao.data.format(DATE_TIME_FORMAT) : null,
      tipoMovimento: movimentacao.tipoMovimento,
      usuario: movimentacao.usuario,
      descricao: movimentacao.descricao,
      saldo: movimentacao.saldo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movimentacao = this.createFromForm();
    if (movimentacao.id !== undefined) {
      this.subscribeToSaveResponse(this.movimentacaoService.update(movimentacao));
    } else {
      this.subscribeToSaveResponse(this.movimentacaoService.create(movimentacao));
    }
  }

  private createFromForm(): IMovimentacao {
    return {
      ...new Movimentacao(),
      id: this.editForm.get(['id'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      data: this.editForm.get(['data'])!.value ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
      tipoMovimento: this.editForm.get(['tipoMovimento'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      saldo: this.editForm.get(['saldo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimentacao>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ISaldo): any {
    return item.id;
  }
}
