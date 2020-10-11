import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICliente } from 'app/shared/model/cliente.model';
import { IMovimentacao } from 'app/shared/model/movimentacao.model';
import { ISaldo } from 'app/shared/model/saldo.model';
type EntityResponseType = HttpResponse<ICliente>;
type EntityArrayResponseType = HttpResponse<ICliente[]>;

import { map } from 'rxjs/operators';
import * as moment from 'moment';

type EntityResponseTypeM = HttpResponse<IMovimentacao>;
type EntityArrayResponseTypeM = HttpResponse<IMovimentacao[]>;

@Injectable({ providedIn: 'root' })
export class HomeService {
  public resourceUrl = SERVER_API_URL + 'api/clientes';
  public resourceUrlSaldo = SERVER_API_URL + 'api/atualisaSaldo';
  public resourceUrlMovimentacao = SERVER_API_URL + 'api/movimentacaos';

  constructor(protected http: HttpClient) {}

  create(cliente: ICliente): Observable<EntityResponseType> {
    return this.http.post<ICliente>(this.resourceUrl, cliente, { observe: 'response' });
  }

  update(cliente: ICliente): Observable<EntityResponseType> {
    return this.http.put<ICliente>(this.resourceUrl, cliente, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICliente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICliente[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  atualisaSaldo(movimentacao: IMovimentacao): Observable<EntityResponseType> {
    return this.http.post<ISaldo>(this.resourceUrlSaldo, movimentacao, { observe: 'response' });
  }

  createM(movimentacao: IMovimentacao): Observable<EntityResponseTypeM> {
    const copy = this.convertDateFromClient(movimentacao);
    return this.http
      .post<IMovimentacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  updateM(movimentacao: IMovimentacao): Observable<EntityResponseTypeM> {
    const copy = this.convertDateFromClient(movimentacao);
    return this.http
      .put<IMovimentacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findM(id: number): Observable<EntityResponseTypeM> {
    return this.http
      .get<IMovimentacao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  queryM(req?: any): Observable<EntityArrayResponseTypeM> {
    const options = createRequestOption(req);
    return this.http
      .get<IMovimentacao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  deleteM(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(movimentacao: IMovimentacao): IMovimentacao {
    const copy: IMovimentacao = Object.assign({}, movimentacao, {
      data: movimentacao.data && movimentacao.data.isValid() ? movimentacao.data.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseTypeM): EntityResponseTypeM {
    if (res.body) {
      res.body.data = res.body.data ? moment(res.body.data) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseTypeM): EntityArrayResponseTypeM {
    if (res.body) {
      res.body.forEach((movimentacao: IMovimentacao) => {
        movimentacao.data = movimentacao.data ? moment(movimentacao.data) : undefined;
      });
    }
    return res;
  }
}
