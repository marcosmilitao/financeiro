import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { ISaldo } from 'app/shared/model/saldo.model';
import { SaldoService } from 'app/entities/saldo/saldo.service';

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html',
})
export class ClienteUpdateComponent implements OnInit {
  isSaving = false;
  saldos: ISaldo[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    telefone: [],
    limite: [],
  });

  constructor(
    protected clienteService: ClienteService,
    protected saldoService: SaldoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      this.updateForm(cliente);

      this.saldoService
        .query({ filter: 'cliente-is-null' })
        .pipe(
          map((res: HttpResponse<ISaldo[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISaldo[]) => {
          if (!cliente.saldo || !cliente.saldo.id) {
            this.saldos = resBody;
          } else {
            this.saldoService
              .find(cliente.saldo.id)
              .pipe(
                map((subRes: HttpResponse<ISaldo>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISaldo[]) => (this.saldos = concatRes));
          }
        });
    });
  }

  updateForm(cliente: ICliente): void {
    this.editForm.patchValue({
      id: cliente.id,
      nome: cliente.nome,
      telefone: cliente.telefone,
      limite: cliente.limite,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  private createFromForm(): ICliente {
    return {
      ...new Cliente(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      limite: this.editForm.get(['limite'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>): void {
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
