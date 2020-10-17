import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISaldo, Saldo } from 'app/shared/model/saldo.model';
import { SaldoService } from './saldo.service';

@Component({
  selector: 'jhi-saldo-update',
  templateUrl: './saldo-update.component.html',
})
export class SaldoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    valor: [null, [Validators.required]],
    dataAtualizacao: [],
    usuario: [],
  });

  constructor(protected saldoService: SaldoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ saldo }) => {
      if (!saldo.id) {
        const today = moment().startOf('day');
        saldo.dataAtualizacao = today;
      }

      this.updateForm(saldo);
    });
  }

  updateForm(saldo: ISaldo): void {
    this.editForm.patchValue({
      id: saldo.id,
      valor: saldo.valor,
      dataAtualizacao: saldo.dataAtualizacao ? saldo.dataAtualizacao.format(DATE_TIME_FORMAT) : null,
      usuario: saldo.usuario,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const saldo = this.createFromForm();
    if (saldo.id !== undefined) {
      this.subscribeToSaveResponse(this.saldoService.update(saldo));
    } else {
      this.subscribeToSaveResponse(this.saldoService.create(saldo));
    }
  }

  private createFromForm(): ISaldo {
    return {
      ...new Saldo(),
      id: this.editForm.get(['id'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      dataAtualizacao: this.editForm.get(['dataAtualizacao'])!.value
        ? moment(this.editForm.get(['dataAtualizacao'])!.value, DATE_TIME_FORMAT)
        : undefined,
      usuario: this.editForm.get(['usuario'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISaldo>>): void {
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
}
