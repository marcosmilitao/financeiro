import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMovimentacao } from 'app/shared/model/movimentacao.model';

type EntityResponseType = HttpResponse<IMovimentacao>;
type EntityArrayResponseType = HttpResponse<IMovimentacao[]>;

@Injectable({ providedIn: 'root' })
export class MovimentacaoService {
  public resourceUrl = SERVER_API_URL + 'api/movimentacaos';
  public resourceUrlSaldoId = SERVER_API_URL + 'api/movimentacaosLista';
  constructor(protected http: HttpClient) {}

  create(movimentacao: IMovimentacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimentacao);
    return this.http
      .post<IMovimentacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(movimentacao: IMovimentacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimentacao);
    return this.http
      .put<IMovimentacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMovimentacao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findBySaldoId(id: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<IMovimentacao[]>(`${this.resourceUrlSaldoId}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMovimentacao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(movimentacao: IMovimentacao): IMovimentacao {
    const copy: IMovimentacao = Object.assign({}, movimentacao, {
      data: movimentacao.data && movimentacao.data.isValid() ? movimentacao.data.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? moment(res.body.data) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((movimentacao: IMovimentacao) => {
        movimentacao.data = movimentacao.data ? moment(movimentacao.data) : undefined;
      });
    }
    return res;
  }
}
