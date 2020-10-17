import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISaldo } from 'app/shared/model/saldo.model';

type EntityResponseType = HttpResponse<ISaldo>;
type EntityArrayResponseType = HttpResponse<ISaldo[]>;

@Injectable({ providedIn: 'root' })
export class SaldoService {
  public resourceUrl = SERVER_API_URL + 'api/saldos';

  constructor(protected http: HttpClient) {}

  create(saldo: ISaldo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(saldo);
    return this.http
      .post<ISaldo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(saldo: ISaldo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(saldo);
    return this.http
      .put<ISaldo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISaldo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISaldo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(saldo: ISaldo): ISaldo {
    const copy: ISaldo = Object.assign({}, saldo, {
      dataAtualizacao: saldo.dataAtualizacao && saldo.dataAtualizacao.isValid() ? saldo.dataAtualizacao.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataAtualizacao = res.body.dataAtualizacao ? moment(res.body.dataAtualizacao) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((saldo: ISaldo) => {
        saldo.dataAtualizacao = saldo.dataAtualizacao ? moment(saldo.dataAtualizacao) : undefined;
      });
    }
    return res;
  }
}
