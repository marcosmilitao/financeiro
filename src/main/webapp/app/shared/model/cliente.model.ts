import { ISaldo } from 'app/shared/model/saldo.model';

export interface ICliente {
  id?: number;
  nome?: string;
  telefone?: string;
  saldo?: ISaldo;
}

export class Cliente implements ICliente {
  constructor(public id?: number, public nome?: string, public telefone?: string, public saldo?: ISaldo) {}
}
