import { Moment } from 'moment';
import { IMovimentacao } from 'app/shared/model/movimentacao.model';

export interface ISaldo {
  id?: number;
  valor?: number;
  dataAtualizacao?: Moment;
  usuario?: string;
  movimentacaos?: IMovimentacao[];
}

export class Saldo implements ISaldo {
  constructor(
    public id?: number,
    public valor?: number,
    public dataAtualizacao?: Moment,
    public usuario?: string,
    public movimentacaos?: IMovimentacao[]
  ) {}
}
