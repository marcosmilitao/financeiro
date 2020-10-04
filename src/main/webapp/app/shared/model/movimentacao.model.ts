import { Moment } from 'moment';
import { ISaldo } from 'app/shared/model/saldo.model';
import { TipoMovimento } from 'app/shared/model/enumerations/tipo-movimento.model';

export interface IMovimentacao {
  id?: number;
  valor?: number;
  data?: Moment;
  tipoMovimento?: TipoMovimento;
  usuario?: string;
  descricao?: string;
  saldo?: ISaldo;
}

export class Movimentacao implements IMovimentacao {
  constructor(
    public id?: number,
    public valor?: number,
    public data?: Moment,
    public tipoMovimento?: TipoMovimento,
    public usuario?: string,
    public descricao?: string,
    public saldo?: ISaldo
  ) {}
}
