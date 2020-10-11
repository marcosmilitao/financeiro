import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HomeService } from 'app/home/home.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ISaldo } from 'app/shared/model/saldo.model';
import { HttpResponse } from '@angular/common/http';

import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { IMovimentacao, Movimentacao } from 'app/shared/model/movimentacao.model';

import { TipoMovimento } from 'app/shared/model/enumerations/tipo-movimento.model';

@Component({
  selector: 'jhi-debito',
  templateUrl: './debito.component.html',
  styleUrls: ['./debito.component.scss'],
})
export class DebitoComponent implements OnInit {
  isSaving = false;
  saldos: ISaldo[] = [];
  m: IMovimentacao | null = null;
  cliente: ICliente | null = null;
  editForm = this.fb.group({
    valor: [null, [Validators.required]],
    tipoMovimento: [],
    descricao: [null, [Validators.required]],
    saldo: [],
  });

  constructor(protected activatedRoute: ActivatedRoute, private fb: FormBuilder, protected homeService: HomeService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => (this.cliente = cliente));
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movimentacao = this.createFromForm();
    this.m = movimentacao;

    this.subscribeToSaveResponse(this.homeService.atualisaSaldo(movimentacao));
  }

  private createFromForm(): IMovimentacao {
    return {
      ...new Movimentacao(),

      valor: this.editForm.get(['valor'])!.value,
      tipoMovimento: TipoMovimento.SAIDA,
      descricao: this.editForm.get(['descricao'])!.value,
      saldo: this.cliente!.saldo,
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
