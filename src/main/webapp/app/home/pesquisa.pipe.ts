import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pesquisa',
})
export class PesquisaPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal = val.nome.toLocaleLowerCase().includes(args) || val.telefone.toLocaleLowerCase().includes(args);
      return rVal;
    });
  }
}
